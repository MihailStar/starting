/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import { build } from './build.js';
import { clear } from './clear.js';

const taskFunction = gulp.series(clear, build);

export { taskFunction as production };
