/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import gulp from 'gulp';
import size from 'gulp-size';
import zip from 'gulp-zip';
import { paths } from '../configuration';
import build from './build';
import clean from './clean';

const projectName = (fs
  .readFileSync('./package.json', 'utf-8')
  .match(/"name": *"(.*)"/) || [])[1];

const fileName = `${projectName ? `${projectName}-` : ''}${new Date()
  .toISOString()
  .replace(/[T:]/g, '-')
  .slice(0, -5)}.zip`;

function archive() {
  return gulp
    .src(paths.archive.src)
    .pipe(zip(fileName))
    .pipe(size({
      title: 'archive',
    }))
    .pipe(gulp.dest(paths.archive.dest));
}

export default gulp.series(
  clean,
  build,
  archive,
);
