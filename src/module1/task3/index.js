import fs from 'node:fs';
import { pipeline } from 'node:stream';
import csv from 'csvtojson';

const csvFilePath = './csv/nodejs-hw1-ex1.csv';
const txtResultFilePath = './src/module1/task3/nodejs-hw1-ex2.txt';

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