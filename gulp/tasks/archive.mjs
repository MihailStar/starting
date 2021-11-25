/* eslint-disable import/no-extraneous-dependencies */

import fs from 'fs';
import gulp from 'gulp';
import zip from 'gulp-zip';
import size from 'gulp-size';
import { paths } from '../configuration.mjs';
import { clear } from './clear.mjs';
import { build } from './build.mjs';

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
    .pipe(
      size({
        title: 'archive',
      })
    )
    .pipe(gulp.dest(paths.archive.dest));
}

const taskFunction = gulp.series(clear, build, archive);

export { taskFunction as archive };
