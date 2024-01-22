const fs = require('fs/promises');
const path = require('path');

const folderPath = './03-files-in-folder/secret-folder';

fs.readdir(folderPath)
  .then((files) => {
    files.forEach((fileName) => {
      const fileFullPath = path.join(folderPath, fileName);

      fs.stat(fileFullPath)
        .then((stats) => {
          if (stats.isFile()) {
            const extensionName = path.extname(fileName);
            const fileSize = stats.size;
            const fileSizeInKb = fileSize / 1024;

            console.log(
              `${fileName}-${extensionName}-${fileSizeInKb.toFixed(3)}kb`,
            );
          }
        })
        .catch((err) => console.error(err));
    });
  })
  .catch((err) => console.error(err));
