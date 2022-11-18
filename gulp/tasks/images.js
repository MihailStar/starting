/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import gulpIf from 'gulp-if';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import size from 'gulp-size';
import {
  imageminConfiguration,
  isDevelopment,
  paths,
} from '../configuration.js';

function convertImages() {
  return gulp
    .src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(gulpIf(!isDevelopment, imagemin(imageminConfiguration)))
    .pipe(gulpIf(!isDevelopment, size({ title: 'compileImages' })))
    .pipe(gulp.dest(paths.images.dest));
}

export { convertImages };
