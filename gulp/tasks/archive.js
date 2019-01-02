/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import size from 'gulp-size';
import zip from 'gulp-zip';
import { paths } from '../configuration';
import build from './build';
import clean from './clean';

function archiveFiles() {
  return gulp
    .src(paths.archive.src)
    .pipe(zip(`${new Date().toISOString().replace(/:/g, '-')}.zip`))
    .pipe(size({
      title: 'archiveFiles',
    }))
    .pipe(gulp.dest(paths.archive.dest));
}

export default gulp.series(
  clean,
  build,
  archiveFiles,
);
