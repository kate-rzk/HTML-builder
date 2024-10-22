const fs = require('fs');
const path = require('path');
const { stdin } = process;

const filePath = path.join(__dirname, 'text.txt');

const writeStream = fs.createWriteStream(filePath);

console.log('Hi, enter the text');
stdin.on('data', (chunk) => {
  if (chunk.toString().toUpperCase().includes('EXIT')) {
    process.exit();
  } else {
    writeStream.write(chunk);
    console.log('enter the text or "exit" to end the process');
  }
});
process.on('error', (error) => console.log('Error', error.message));
process.on('SIGINT', () => process.exit());
process.on('exit', () => console.log('\nText is written, by'));
