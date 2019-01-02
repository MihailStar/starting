/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import build from './build';
import clean from './clean';

export default gulp.series(
  clean,
  build,
);
