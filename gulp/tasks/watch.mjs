/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import { convertImageToBase64 } from './base64.mjs';
import { compileFonts } from './fonts.mjs';
import { reloadServer } from './server.mjs';
import { compileImages } from './images.mjs';
import { compileScripts } from './scripts.mjs';
import { generateSprite } from './sprite.mjs';
import { compileStyles } from './styles.mjs';
import { compileTemplates } from './templates.mjs';
import { paths } from '../configuration.mjs';

function watch() {
  const watchFor = {
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
