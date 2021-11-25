/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import { compileFonts } from './fonts.mjs';
import { compileImages } from './images.mjs';
import { compileScripts } from './scripts.mjs';
import { compileStyles } from './styles.mjs';
import { compileTemplates } from './templates.mjs';
import { generateSprite } from './sprite.mjs';

const taskFunction = gulp.parallel(
  compileFonts,
  compileImages,
  compileScripts,
  compileStyles,
  compileTemplates,
  generateSprite
);

export { taskFunction as build };
