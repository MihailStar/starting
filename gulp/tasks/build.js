/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import compileFonts from './fonts';
import compileImages from './images';
import compileScripts from './scripts';
import compileStyles from './styles';
import compileTemplates from './templates';
import generateSprite from './sprite';

export default gulp.parallel(
  compileFonts,
  compileImages,
  compileScripts,
  compileStyles,
  compileTemplates,
  generateSprite,
);
