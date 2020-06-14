/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import build from './build.js';
import clean from './clean.js';

export default gulp.series(
  clean,
  build,
);
