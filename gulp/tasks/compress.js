import {paths} from '../configuration.js';
import build from './build.js';
import clean from './clean.js';
import gulp from 'gulp';
import zip from 'gulp-zip';

function compressFiles() {
  return gulp.src(paths.compress.src)
    .pipe(zip(`${+new Date()}.zip`))
    .pipe(gulp.dest(paths.compress.dest));
}

export default gulp.series(
  clean,
  build,
  compressFiles
);