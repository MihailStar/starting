/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';

import { clear } from './clear.mjs';
import { build } from './build.mjs';

const taskFunction = gulp.series(clear, build);

export { taskFunction as production };
