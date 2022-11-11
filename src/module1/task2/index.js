const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream');
const csv = require('csvtojson');

const csvFilePath = './csv/nodejs-hw1-ex1.csv';
const txtResultFilePath = path.dirname(__filename) + '/nodejs-hw1-ex2.txt';

const readFromStream = csv();
const readableStream = fs.createReadStream(csvFilePath);
const writableStream = fs.createWriteStream(txtResultFilePath, 'utf-8'); 

pipeline (
    readableStream,
    readFromStream,
    writableStream,
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
);