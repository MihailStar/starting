import {paths, imageminConfig} from '../configuration.js';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import svgstore from 'gulp-svgstore';

function generateSprite() {
  return gulp.src(paths.sprite.src)
    .pipe(rename({
      prefix: 'icon-'
    }))
    .pipe(imagemin(imageminConfig))
    .pipe(svgstore())
    .pipe(gulp.dest(paths.sprite.dest));
}

generateSprite.displayName = 'generate sprite';

export default generateSprite;