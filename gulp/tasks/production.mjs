/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import { build } from './build.mjs';
import { clear } from './clear.mjs';

const taskFunction = gulp.series(clear, build);

export { taskFunction as production };
