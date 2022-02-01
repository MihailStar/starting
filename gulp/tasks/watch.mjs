/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import { compileFonts } from './fonts.mjs';
import { compileImages } from './images.mjs';
import { compileScripts } from './scripts.mjs';
import { compileStyles } from './styles.mjs';
import { compileTemplates } from './templates.mjs';
import { convertImageToBase64 } from './base64.mjs';
import { copyAssets } from './assets.mjs';
import { generateSprite } from './sprite.mjs';
import { paths } from '../configuration.mjs';
import { reloadServer } from './server.mjs';

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
