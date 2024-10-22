const fs = require('fs');
const path = require('path');
const { stdout } = process;

const pathFolder = path.join(__dirname, 'secret-folder');
fs.readdir(pathFolder, { withFilesType: true }, (err, files) => {
  stdout.write('\nCurrent directory files:\n');
  if (err) stdout.write(err);
  else {
    files.forEach((file) => {
      const fileFullPath = path.join(pathFolder, file);
      fs.stat(fileFullPath, (err, stats) => {
        if (err) stdout.write(err);
        else if (stats.isFile()) {
          const extName = path.extname(file).slice(1);
          const sizeFile = stats.size / 1000;
          let fileName = path.parse(file).name;
          stdout.write(`${fileName} - ${extName} - ${sizeFile}kb\n`);
        }
      });
    });
  }
});
