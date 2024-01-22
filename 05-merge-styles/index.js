const fs = require('fs');
const path = require('path');

function readCssFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) reject(err);
      else resolve(content);
    });
  });
}

function readCssFiles(folderPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
      if (err) reject(err);
      else {
        const cssFilesPromises = files
          .filter((file) => file.isFile() && path.extname(file.name) === '.css')
          .map((file) => readCssFile(path.join(folderPath, file.name)));
        Promise.all(cssFilesPromises).then(resolve).catch(reject);
      }
    });
  });
}

function writeBundleFile(styles) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, 'project-dist/bundle.css'),
      styles,
      (err) => {
        if (err) reject(err);
        else {
          console.log('Bundle file updated');
          resolve();
        }
      },
    );
  });
}

readCssFiles(path.join(__dirname, 'styles'))
  .then((styles) => writeBundleFile(styles.join('\n')))
  .catch((err) => console.error(err));
