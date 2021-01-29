const crypto = require('crypto');
const { writeToString } = require('@fast-csv/format');
const spawn = require('child_process').spawn;
const fs = require('fs');
const csv = require('fast-csv');
const fetch = require('node-fetch');
const { className, bodyName } = require('./helper_data');
const flaskServerUrl = 'https://soybean-flask-app.herokuapp.com/';

function isValidDesease(deseaseName) {
  const checker = className.filter(name => name === deseaseName);
  if (checker.length === 1) {
    return true;
  }
  return false;
}

function getHeaderForResultCsv() {
  let result = '';
  bodyName.forEach(body => {
    result += `"${body}",`;
  });
  result += '"class"\n';
  return result
}

function createFileName() {
  const expirey = new Date();
  expirey.setHours(expirey.getHours() + 1); // expirey time is 1 hours
  const expireyTime = parseInt(expirey.getTime() / 1000);
  const id = crypto.randomBytes(3).toString('hex');
  return `${id}-${expireyTime}.csv`;
}

/**
 * 
 * @param {Array[Object]} data read from csv: [{"roots": value1, "seed": value2, ...}]
 * @rerturns {Array} result: [value1, value2]
 */
function convertDataFromCsvFormat(data) {
  const result = [];
  bodyName.forEach(body => {
    result.push(data[body]);
  });
  return result;
}

function getWaitTime(filesize) { // filesize is measure in byte
  const oneKB = 1024;
  const oneMB = 1024 * oneKB;
  let waitTime;
  if (filesize <= 500 * oneKB) { // smaller than or equal 500kb
    waitTime = 10;
  } else if (filesize <= oneMB) {
    waitTime = 15;
  } else {
    waitTime = 20;
  }
  return waitTime;
}

async function fetchPredictClass(rawData) {
  const response = await fetch(flaskServerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rawData)
  });
  const resData = await response.json();
  return className[parseInt(resData['result'])]
}

function handleUploadFile(req, res, clientCsvFilePath, resultFilePath, resultCsvFileName) {
  const csvHeader = getHeaderForResultCsv();
  const waitTime = getWaitTime(req.file.size);
  fs.writeFile(resultFilePath, csvHeader, () => { });
  fs.createReadStream(clientCsvFilePath)
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', async rawData => {
      const data = convertDataFromCsvFormat(rawData);
      const desease = await fetchPredictClass(rawData);
      setTimeout(() => { }, 50);
      data.push(desease);

      writeToString([data]).then(data => {
        fs.appendFile(resultFilePath, `${data}\n`, () => { });
      });
    })
    .on('end', () => res.render('download',
      {
        link: `/download/${resultCsvFileName}`,
        waitTime
      }
    ));
}

async function getPredictClass(pythonScriptPath, data) {
  return new Promise(async (resolve, reject) => {
    const process = spawn('python', [pythonScriptPath, ...data]);
    const predictClass = [];
    for await (const data of process.stdout) {
      predictClass.push(data.toString());
    };
    const desease = className[parseInt(predictClass[0])];
    resolve(desease);
  });
}

module.exports = {
  isValidDesease,
  getHeaderForResultCsv,
  createFileName,
  handleUploadFile,
  getPredictClass
}