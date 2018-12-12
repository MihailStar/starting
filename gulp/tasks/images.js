import {paths, isDevelopment, imageminConfig} from '../configuration.js';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';

function compileImages() {
  return gulp.src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(gulpIf(!isDevelopment, imagemin(imageminConfig)))
    .pipe(gulp.dest(paths.images.dest));
}

compileImages.displayName = 'compile images';

export default compileImages;