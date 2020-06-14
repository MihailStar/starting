/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import { initializeServer } from './server.js';
import build from './build.js';
import clean from './clean.js';
import watch from './watch.js';

export default gulp.series(
  clean,
  build,
  gulp.parallel(
    initializeServer,
    watch,
  ),
);
