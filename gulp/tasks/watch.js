/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import { paths } from '../configuration.js';
import { copyAssets } from './assets.js';
import { convertImageToBase64 } from './base64.js';
import { copyFonts } from './fonts.js';
import { convertImages } from './images.js';
import { compileScripts } from './scripts.js';
import { reloadServer } from './server.js';
import { generateSprite } from './sprite.js';
import { compileStyles } from './styles.js';
import { compileTemplates } from './templates.js';

function watch() {
  const watchFor = {
    assets: [copyAssets],
    base64: [convertImageToBase64],
    fonts: [copyFonts, reloadServer],
    images: [convertImages, reloadServer],
    scripts: [compileScripts, reloadServer],
    sprite: [generateSprite, reloadServer],
    styles: [compileStyles],
    templates: [compileTemplates, reloadServer],
  };
  Object.keys(watchFor).forEach((path) =>
    gulp.watch(paths[path].watch, gulp.series(...watchFor[path])),
  );
}

export { watch };
