import fs from 'fs';
import path from 'path';
import url from 'url';

const DIRECTORY = path.join(
  path.dirname(url.fileURLToPath(import.meta.url)),
  './src/components'
);

const [, , componentName] = process.argv;
const filesData = {
  pug: `mixin ${componentName}
  .${componentName}&attributes(attributes)
    block
`,
  scss: `@use '../../styles/utilities/box-sizing-border-box.scss';

.${componentName} {
  @extend %box-sizing-border-box;
}
`,
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
 * @returns {Promise<string[]>}
 */
function createFiles(directoryPath) {
  /** @type {Promise<string>[]} */
  const promises = [];

  Object.entries(filesData).forEach(([extension, fileData]) => {
    promises.push(
      createFile(
        path.join(directoryPath, `${componentName}.${extension}`),
        String(fileData)
      )
    );
  });

  return Promise.all(promises);
}

Promise.resolve()
  .then(() => createDirectory(path.join(DIRECTORY, componentName)))
  .then((directoryPath) => createFiles(directoryPath))
  .catch((error) => process.stdout.write(String(error)));
