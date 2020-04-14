/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import newer from 'gulp-newer';
import size from 'gulp-size';
import { paths, isDevelopment } from '../configuration';

function compileFonts() {
  return gulp
    .src(paths.fonts.src)
    .pipe(newer(paths.fonts.dest))
    .pipe(gulpIf(!isDevelopment, size({
      title: 'compileFonts',
    })))
    .pipe(gulp.dest(paths.fonts.dest));
}

export default compileFonts;
