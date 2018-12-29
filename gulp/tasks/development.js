import { initializeServer } from './server.js';
import build from './build.js';
import clean from './clean.js';
import gulp from 'gulp';
import watch from './watch.js';

export default gulp.series(
  clean,
  build,
  gulp.parallel(initializeServer, watch)
);
