/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import { build } from './build.js';
import { clear } from './clear.js';
import { initializeServer } from './server.js';
import { watch } from './watch.js';

const taskFunction = gulp.series(
  clear,
  build,
  gulp.parallel(initializeServer, watch),
);

export { taskFunction as development };
