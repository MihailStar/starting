/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import { compileFonts } from './fonts.js';
import { compileImages } from './images.js';
import { compileScripts } from './scripts.js';
import { compileStyles } from './styles.js';
import { compileTemplates } from './templates.js';
import { convertImageToBase64 } from './base64.js';
import { copyAssets } from './assets.js';
import { generateSprite } from './sprite.js';
import { paths } from '../configuration.js';
import { reloadServer } from './server.js';

function watch() {
  const watchFor = {
    assets: [copyAssets],
    base64: [convertImageToBase64],
    fonts: [compileFonts, reloadServer],
    images: [compileImages, reloadServer],
    scripts: [compileScripts, reloadServer],
    sprite: [generateSprite, reloadServer],
    styles: [compileStyles],
    templates: [compileTemplates, reloadServer],
  };
  Object.keys(watchFor).forEach((path) =>
    gulp.watch(paths[path].watch, gulp.series(...watchFor[path]))
  );
}

export { watch };
