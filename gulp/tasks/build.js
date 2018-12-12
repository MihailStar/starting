import fonts from './fonts.js';
import gulp from 'gulp';
import images from './images.js';
import scriptLibraries from './scriptLibraries.js';
import scripts from './scripts.js';
import styles from './styles.js';
import templates from './templates.js';

const build = gulp.parallel(
  fonts,
  images,
  scriptLibraries,
  scripts,
  styles,
  templates
);

export default build;