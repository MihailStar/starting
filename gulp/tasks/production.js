import build from './build.js';
import clean from './clean.js';
import gulp from 'gulp';

export default gulp.series(
  clean,
  build
);