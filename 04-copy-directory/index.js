const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  fs.readdir(dest, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    // Удаляем все файлы и подкаталоги
    // из папки назначения, которые не существуют в папке источнике
    files.forEach((file) => {
      const srcPath = path.join(src, file.name);
      const destPath = path.join(dest, file.name);

      if (file.isDirectory()) {
        if (!fs.existsSync(srcPath)) {
          fs.rmdirSync(destPath, { recursive: true });
        } else {
          copyDir(srcPath, destPath);
        }
      } else {
        if (!fs.existsSync(srcPath)) {
          fs.unlinkSync(destPath);
        }
      }
    });

    // Копируем все файлы и подкаталоги из папки источника
    // в папку назначения
    fs.readdir(src, { withFileTypes: true }, (err, files) => {
      if (err) throw err;

      files.forEach((file) => {
        const srcPath = path.join(src, file.name);
        const destPath = path.join(dest, file.name);

        if (file.isDirectory()) {
          copyDir(srcPath, destPath);
        } else {
          fs.copyFile(srcPath, destPath, (err) => {
            if (err) throw err;
          });
        }
      });
    });
  });
}

copyDir(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));
