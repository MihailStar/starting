/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import { initializeServer } from './server';
import build from './build';
import clean from './clean';
import watch from './watch';

export default gulp.series(
  clean,
  build,
  gulp.parallel(
    initializeServer,
    watch,
  ),
);
