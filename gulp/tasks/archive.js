import {paths} from '../configuration.js';
import build from './build.js';
import clean from './clean.js';
import gulp from 'gulp';
import size from 'gulp-size';
import zip from 'gulp-zip';

function archiveFiles() {
  return gulp.src(paths.compress.src)
    .pipe(zip(`${+new Date()}.zip`))
    .pipe(size({
      title: 'archived file size'
    }))
    .pipe(gulp.dest(paths.compress.dest));
}

export default gulp.series(
  clean,
  build,
  archiveFiles
);