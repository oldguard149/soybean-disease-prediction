const CronJob = require('cron').CronJob;
const fs = require('fs');
const path = require('path');

const job = new CronJob('0 */1 * * * *', function () {
    fs.readdirSync(__dirname)
        .filter(file => file !== 'test.js' && file !== 'cron_for_delete_file.js')
        .map(file => file.split('.')[0])
        .forEach(file => {
            const time = file.split('-')[1];
            if (parseInt(time) < parseInt(Date.now() / 1000)) {
                fs.unlink(path.resolve(__dirname, `${file}.csv`), () => {});
            }
        });
});

module.exports = job;