/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import { compileFonts } from './fonts.js';
import { compileImages } from './images.js';
import { compileScripts } from './scripts.js';
import { compileStyles } from './styles.js';
import { compileTemplates } from './templates.js';
import { copyAssets } from './assets.js';
import { generateSprite } from './sprite.js';

const taskFunction = gulp.parallel(
  compileFonts,
  compileImages,
  compileScripts,
  compileStyles,
  compileTemplates,
  copyAssets,
  generateSprite
);

export { taskFunction as build };
