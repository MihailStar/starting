/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const DIRECTORY = path.join(__dirname, './src/blocks');

const [, , blockName] = process.argv;
const filesData = {
  js: '',
  pug: `mixin ${blockName}\n  .${blockName}&attributes(attributes)\n    block\n`,
  scss: `.${blockName} {\n  box-sizing: border-box;\n\n  & *,\n  & *::before,\n  & *::after {\n    box-sizing: inherit;\n  }\n}\n`,
};

/**
 * @param {string} directoryPath
 * @returns {Promise}
 */
const createDirectory = (directoryPath) => {
  return new Promise((onSuccess, onError) => {
    fs.mkdir(directoryPath, (error) => {
      if (error) {
        onError(error);
      } else {
        onSuccess(directoryPath);
      }
    });
  });
};

/**
 * @param {string} filePath
 * @param {string} fileData
 * @returns {Promise}
 */
const createFile = (filePath, fileData) => {
  return new Promise((onSuccess, onError) => {
    fs.writeFile(filePath, fileData, 'utf8', (error) => {
      if (error) {
        onError(error);
      } else {
        onSuccess(filePath);
      }
    });
  });
};

/**
 * @param {string} directoryPath
 * @returns {Promise}
 */
const createFiles = (directoryPath) => {
  const promises = [];

  Object.entries(filesData).forEach(([extension, fileData]) => {
    promises.push(
      createFile(
        path.join(directoryPath, `${blockName}.${extension}`),
        fileData
      )
    );
  });

  return Promise.all(promises);
};

Promise.resolve()
  .then(() => {
    return createDirectory(path.join(DIRECTORY, blockName));
  })
  .then((directoryPath) => {
    return createFiles(directoryPath);
  })
  .catch((error) => {
    console.error(error);
  });
