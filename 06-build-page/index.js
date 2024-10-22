const fs = require('fs');
const path = require('path');

const pathTemplate = path.join(__dirname, 'template.html');
const pathComponents = path.join(__dirname, 'components');
const pathOriginalFolderStyle = path.join(__dirname, 'styles');
const pathBundleFolder = path.join(__dirname, 'project-dist');
const pathOriginalFolderAssets = path.join(__dirname, 'assets');
const pathCopyFolderAssets = path.join(pathBundleFolder, 'assets');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
});

replaceTag();
bundleStyle();
copyFolders();

function replaceTag() {
  fs.readdir(pathComponents, (err) => {
    if (err) throw err;

    fs.readFile(pathTemplate, 'utf-8', (err, template) => {
      if (err) throw err;

      const regex = /\{\{(.*?)\}\}/g;
      const matches = template.match(regex);

      let htmlBuild = template;
      let filesProcessed = 0;

      matches.forEach((el) => {
        const elName = el.slice(2, -2);
        const pathFile = path.join(pathComponents, elName + '.html');

        fs.readFile(pathFile, 'utf-8', (err, content) => {
          if (err) throw err;

          htmlBuild = htmlBuild.replace(el, `\n${content}`);
          filesProcessed++;

          if (filesProcessed === matches.length) {
            fs.writeFile(
              path.join(pathBundleFolder, 'index.html'),
              htmlBuild,
              'utf-8',
              (err) => {
                if (err) throw err;
                console.log('File index.html add');
              },
            );
          }
        });
      });
    });
  });
}

const writeStream = fs.createWriteStream(
  path.join(pathBundleFolder, 'style.css'),
);

function bundleStyle() {
  fs.readdir(pathOriginalFolderStyle, (err, elements) => {
    if (err) throw err;

    elements.forEach((el) => {
      const pathFile = path.join(pathOriginalFolderStyle, el);

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

function copyFolders() {
  fs.rm(pathCopyFolderAssets, { recursive: true, force: true }, (err) => {
    if (err) throw err;
    fs.mkdir(
      path.join(pathBundleFolder, 'assets'),
      { recursive: true },
      (err) => {
        if (err) throw err;
      },
    );
    fs.readdir(pathOriginalFolderAssets, (err, elements) => {
      if (err) throw err;
      elements.forEach((el) => {
        const pathEl = path.join(pathOriginalFolderAssets, el);
        fs.stat(pathEl, (err, stats) => {
          if (err) throw err;
          else if (stats.isFile()) {
            fs.copyFile(
              path.join(pathOriginalFolderAssets, el),
              path.join(pathCopyFolderAssets, el),
              (err) => {
                if (err) throw err;
              },
            );
          } else {
            fs.mkdir(
              path.join(pathCopyFolderAssets, el),
              { recursive: true },
              (err) => {
                if (err) throw err;
              },
            );
            const pathCopyFolder = path.join(pathCopyFolderAssets, el);
            fs.readdir(pathEl, (err, files) => {
              if (err) throw err;
              files.forEach((file) => {
                fs.copyFile(
                  path.join(pathEl, file),
                  path.join(pathCopyFolder, file),
                  (err) => {
                    if (err) throw err;
                  },
                );
              });
            });
          }
        });
      });
    });
    console.log('All files are copied');
  });
}
