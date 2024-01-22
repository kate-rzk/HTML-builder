const fs = require('fs');
const readline = require('readline');
const path = require('path');
const process = require('process');

const filePath = path.join(__dirname, 'text.txt');

console.log('Приветствую! Введите текст для записи в файл.');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    rl.close();
  } else {
    fs.appendFile(filePath, input + '\n', (err) => {
      if (err) throw err;
      console.log(`Текст "${input}" успешно записан в файл!`);
      console.log('Введите текст или введите "exit" для выхода.');
    });
  }
});

rl.on('close', () => {
  console.log('Запись текста в файл завершена.');
  process.exit(0);
});
