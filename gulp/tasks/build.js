import gulp from 'gulp';
import compileFonts from './fonts';
import compileImages from './images';
import compileScripts from './scripts';
import compileStyles from './styles';
import compileTemplates from './templates';

export default gulp.parallel(
  compileFonts,
  compileImages,
  compileScripts,
  compileStyles,
  compileTemplates,
);
