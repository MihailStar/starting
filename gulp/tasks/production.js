import build from './build.js';
import clean from './clean.js';
import gulp from 'gulp';

const production = gulp.series(
  clean,
  build
);

export default production;