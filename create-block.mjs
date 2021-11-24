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
function createDirectory(directoryPath /*: string */) /*: Promise<string> */ {
  return new Promise((onSuccess, onError) => {
    fs.mkdir(directoryPath, (error /*: Error | null */) => {
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
function createFile(
  filePath /*: string */,
  fileData /*: string */
) /*: Promise<string> */ {
  return new Promise((onSuccess, onError) => {
    fs.writeFile(filePath, fileData, 'utf8', (error /*: Error | null */) => {
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
function createFiles(
  directoryPath /*: string */
) /*: Promise<Array<string>> */ {
  /**
   * @type {Array<Promise<string>>}
   */
  const promises /*: Array<Promise<string>> */ = [];

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
  .then((directoryPath /*: string */) => createFiles(directoryPath))
  .catch((error /*: Error */) => process.stdout.write(error.toString()));
