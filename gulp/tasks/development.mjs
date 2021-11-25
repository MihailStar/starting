/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import { clear } from './clear.mjs';
import { build } from './build.mjs';
import { initializeServer } from './server.mjs';
import { watch } from './watch.mjs';

const taskFunction = gulp.series(
  clear,
  build,
  gulp.parallel(initializeServer, watch)
);

export { taskFunction as development };
