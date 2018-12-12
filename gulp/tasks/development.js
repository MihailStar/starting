import {serverInitialization} from './server.js';
import build from './build.js';
import clean from './clean.js';
import gulp from 'gulp';
import watch from './watch.js';

const development = gulp.series(
  clean,
  build,
  gulp.parallel(
    serverInitialization,
    watch
  )
);

export default development;