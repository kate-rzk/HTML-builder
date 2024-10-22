const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'files');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
});

const pathCopyFolder = path.join(__dirname, 'files-copy');

function getCurrentFilenames() {
  fs.readdir(pathFolder, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.copyFile(
        path.join(pathFolder, file),
        path.join(pathCopyFolder, file),
        (err) => {
          if (err) {
            console.log('Error Found:', err);
          }
        },
      );
    });
  });
  deleteOldFile();
  console.log('All files are copied');
}

function deleteOldFile() {
  fs.readdir(pathCopyFolder, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.stat(path.join(pathFolder, file), (err) => {
        if (err)
          fs.unlink(path.join(pathCopyFolder, file), (err) => {
            if (err) throw err;
          });
      });
    });
  });
}
getCurrentFilenames();
