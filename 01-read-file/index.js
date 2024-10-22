const fs = require('fs');
const path = require('path');

const { stdout, stderr } = process;
const filePath = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(filePath);

readableStream.on('data', (chunk) =>
  stdout.write('Text from "text.txt": \n' + chunk.toString()),
);

readableStream.on('end', () => stdout.write('File reading is complete\n'));

readableStream.on('error', (err) =>
  stderr.write(`An error occurred: ${err.message}`),
);
