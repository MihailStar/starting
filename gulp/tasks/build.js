/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import compileFonts from './fonts.js';
import compileImages from './images.js';
import compileScripts from './scripts.js';
import compileStyles from './styles.js';
import compileTemplates from './templates.js';
import generateSprite from './sprite.js';

export default gulp.parallel(
  compileFonts,
  compileImages,
  compileScripts,
  compileStyles,
  compileTemplates,
  generateSprite,
);
