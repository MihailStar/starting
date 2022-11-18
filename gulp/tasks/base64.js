/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import imageDataURI from 'gulp-image-data-uri';
import imagemin from 'gulp-imagemin';
import size from 'gulp-size';
import { imageminConfiguration, paths } from '../configuration.js';

function convertImageToBase64() {
  return gulp
    .src(paths.base64.src)
    .pipe(imagemin(imageminConfiguration))
    .pipe(imageDataURI())
    .pipe(size({ title: 'convertImageToBase64' }))
    .pipe(gulp.dest(paths.base64.dest));
}

export { convertImageToBase64 };
