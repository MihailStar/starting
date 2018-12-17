import {paths, isDevelopment} from '../configuration.js';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import newer from 'gulp-newer';
import size from 'gulp-size';

function compileFonts() {
  return gulp.src(paths.fonts.src)
    .pipe(newer(paths.fonts.dest))
    .pipe(gulpIf(!isDevelopment, size({
      title: 'size of compiled fonts'
    })))
    .pipe(gulp.dest(paths.fonts.dest));
}

export default compileFonts;