import {paths} from '../configuration.js';
import gulp from 'gulp';
import newer from 'gulp-newer';

function compileFonts() {
  return gulp.src(paths.fonts.src)
    .pipe(newer(paths.fonts.dest))
    .pipe(gulp.dest(paths.fonts.dest));
}

compileFonts.displayName = 'compile fonts';

export default compileFonts;