/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import size from 'gulp-size';
import svgstore from 'gulp-svgstore';
import { imageminConfiguration, paths } from '../configuration.js';

function generateSprite() {
  return gulp
    .src(paths.sprite.src)
    .pipe(imagemin(imageminConfiguration))
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgstore())
    .pipe(size({ title: 'generateSprite' }))
    .pipe(gulp.dest(paths.sprite.dest));
}

export { generateSprite };
