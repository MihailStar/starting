/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import compileFonts from './fonts';
import compileImages from './images';
import compileScriptLibraries from './libraries';
import compileScripts from './scripts';
import compileStyles from './styles';
import compileTemplates from './templates';

export default gulp.parallel(
  compileFonts,
  compileImages,
  compileScriptLibraries,
  compileScripts,
  compileStyles,
  compileTemplates,
);
