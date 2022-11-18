/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import gulpIf from 'gulp-if';
import newer from 'gulp-newer';
import size from 'gulp-size';
import { isDevelopment, paths } from '../configuration.js';

function copyAssets() {
  return gulp
    .src(paths.assets.src)
    .pipe(newer(paths.assets.dest))
    .pipe(gulpIf(!isDevelopment, size({ title: 'copyAssets' })))
    .pipe(gulp.dest(paths.assets.dest));
}

export { copyAssets };
