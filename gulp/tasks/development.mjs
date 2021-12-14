/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import { build } from './build.mjs';
import { clear } from './clear.mjs';
import { initializeServer } from './server.mjs';
import { watch } from './watch.mjs';

const taskFunction = gulp.series(
  clear,
  build,
  gulp.parallel(initializeServer, watch)
);

export { taskFunction as development };
