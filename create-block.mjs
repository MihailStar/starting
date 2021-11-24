import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const DIRECTORY = path.join(
  dirname(fileURLToPath(import.meta.url)),
  './src/blocks'
);

const [, , blockName] = process.argv;
const filesData = {
  pug: `mixin ${blockName}\n  .${blockName}&attributes(attributes)\n    block\n`,
  scss: `.${blockName} {\n  @extend %border-box;\n}\n`,
  ts: '',
};

/**
 * @param {string} directoryPath
 * @returns {Promise<string>}
 */
function createDirectory(directoryPath) {
  return new Promise((onSuccess, onError) => {
    fs.mkdir(directoryPath, (error) => {
      if (error) {
        onError(error);
      } else {
        onSuccess(directoryPath);
      }
    });
  });
}

/**
 * @param {string} filePath
 * @param {string} fileData
 * @returns {Promise<string>}
 */
function createFile(filePath, fileData) {
  return new Promise((onSuccess, onError) => {
    fs.writeFile(filePath, fileData, 'utf8', (error) => {
      if (error) {
        onError(error);
      } else {
        onSuccess(filePath);
      }
    });
  });
}

/**
 * @param {string} directoryPath
 * @returns {Promise<Array<string>>}
 */
function createFiles(directoryPath) {
  /** @type {Array<Promise<string>>} */
  const promises = [];

  Object.entries(filesData).forEach(([extension, fileData]) => {
    promises.push(
      createFile(
        path.join(directoryPath, `${blockName}.${extension}`),
        String(fileData)
      )
    );
  });

  return Promise.all(promises);
}

Promise.resolve()
  .then(() => createDirectory(path.join(DIRECTORY, blockName)))
  .then((directoryPath) => createFiles(directoryPath))
  .catch((error) => process.stdout.write(String(error)));
