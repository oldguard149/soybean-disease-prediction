const express = require('express');
const router = express.Router();
const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const { Parser } = require('json2csv');

const mockData = require('../lib/deseasedata.json');
const upload = require('../lib/upload_file');
const csvUpload = upload.single('csv');
const { isValidDesease, createFileName, handleUploadFile, getPredictClass } = require('../lib/helper');
const { bodyName, csvFields } = require('../lib/helper_data');



/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/result/:name', (req, res) => {
  const desease = req.params.name;
  if (isValidDesease(desease)) {
    const data = mockData[desease];
    res.render('result', { data, desease });
  } else {
    res.redirect('/');
  }
});

router.get('/upload-csv', (req, res) => {
  res.render('upload-csv');
});

router.post('/', async (req, res) => {
  try {
    const formData = [];
    bodyName.forEach(value => {
      formData.push(req.body[value]);
    })

    // path of python and model is looked up from app.js directory position
    const desease = await getPredictClass("ml_model/script.py", formData)
    res.redirect(`/result/${desease}`);
  } catch (error) {
    console.log(error);
    res.render('error', { message: "Server error!", error });
  }
});


router.post('/upload-csv', (req, res) => {
  csvUpload(req, res, (err) => {
    if (err) { // this error occures when upload file
      if (err.code === "LIMIT_FILE_SIZE") {
        res.render('upload-csv', {filesizeError: true});
      }
    } else {
      try {
        const clientCsvFilePath = path.resolve(__dirname, req.file.filename);
        const resultCsvFileName = createFileName();
        const resultFilePath = path.resolve(__dirname, 'resultdata', resultCsvFileName);

        // read upload csv file, get predict for each record and then save data to file named resultCsvFileName
        handleUploadFile(req, res, clientCsvFilePath, resultFilePath, resultCsvFileName);

        // delete upload file
        fs.unlinkSync(clientCsvFilePath); 
      } catch (error) {
        console.log(error);
        res.send('error');
      }
    }
  }); // end of csvUpload
});

router.get('/download/:filename', (req, res) => {
  try {
    const fileRows = [];
    const fields = csvFields;
    const fileName = req.params.filename;

    const resquestFilePath = path.resolve(__dirname, 'resultdata', fileName);
    fs.access(resquestFilePath, (err) => {
      if (err) {
        res.status(404).send('File not found');
      } else {
        fs.createReadStream(resquestFilePath)
          .pipe(csv.parse({ headers: true }))
          .on('data', data => {
            fileRows.push(data);
          })
          .on('end', () => {
            const json2csv = new Parser({ fields: fields });
            const csvData = json2csv.parse(fileRows);
            res.attachment('data.csv');
            res.status(200).send(csvData);
          });
      }
    });
  } catch (error) {
    console.log(error);
    res.send('error')
  }
});

module.exports = router;