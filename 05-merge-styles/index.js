const fs = require('fs');
const path = require('path');

const pathOriginalFolder = path.join(__dirname, 'styles');
const pathBundleFolder = path.join(__dirname, 'project-dist');

const writeStream = fs.createWriteStream(
  path.join(pathBundleFolder, 'bundle.css'),
);

function bundleStyle() {
  fs.readdir(pathOriginalFolder, (err, elements) => {
    if (err) throw err;

    elements.forEach((el) => {
      const pathFile = path.join(pathOriginalFolder, el);

      fs.stat(pathFile, (err, stats) => {
        if (err) throw err;
        else if (stats.isFile() && path.extname(el) == '.css') {
          const readStream = fs.createReadStream(pathFile, 'utf-8');
          readStream.pipe(writeStream);
        }
      });
    });
    console.log('Bundle file updated');
  });
}

bundleStyle();
