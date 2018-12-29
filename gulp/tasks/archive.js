import { paths } from '../configuration.js';
import build from './build.js';
import clean from './clean.js';
import gulp from 'gulp';
import size from 'gulp-size';
import zip from 'gulp-zip';

function archiveFiles() {
  return gulp
    .src(paths.archive.src)
    .pipe(zip(`${new Date().toISOString().replace(/:/g, '-')}.zip`))
    .pipe(size({
      title: 'archiveFiles size'
    }))
    .pipe(gulp.dest(paths.archive.dest));
}

export default gulp.series(
  clean,
  build,
  archiveFiles
);
