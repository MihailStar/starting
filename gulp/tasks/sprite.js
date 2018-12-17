import {paths, imageminConfig} from '../configuration.js';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import size from 'gulp-size';
import svgstore from 'gulp-svgstore';

function generateSprite() {
  return gulp.src(paths.sprite.src)
    .pipe(rename({
      prefix: 'icon-'
    }))
    .pipe(imagemin(imageminConfig))
    .pipe(svgstore())
    .pipe(size({
      title: 'generated sprite size'
    }))
    .pipe(gulp.dest(paths.sprite.dest));
}

export default generateSprite;