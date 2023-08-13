/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import { copyAssets } from './assets.js';
import { copyFonts } from './fonts.js';
import { convertImages } from './images.js';
import { compileScripts } from './scripts.js';
import { generateSprite } from './sprite.js';
import { compileStyles } from './styles.js';
import { compileTemplates } from './templates.js';

const taskFunction = gulp.parallel(
  compileScripts,
  compileStyles,
  compileTemplates,
  convertImages,
  copyAssets,
  copyFonts,
  generateSprite,
);

export { taskFunction as build };
