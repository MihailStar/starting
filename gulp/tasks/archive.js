/* eslint-disable import/no-extraneous-dependencies */

import fs from 'fs';
import gulp from 'gulp';
import size from 'gulp-size';
import zip from 'gulp-zip';
import { paths } from '../configuration.js';
import { build } from './build.js';
import { clear } from './clear.js';

const projectName = (fs
  .readFileSync('./package.json', 'utf-8')
  .match(/"name": *"(.*)"/) || [])[1];

const fileName = `${projectName ? `${projectName}-` : ''}${new Date()
  .toISOString()
  .replace(/[T:]/g, '-')
  .slice(0, -5)}.zip`;

function archiveProject() {
  return gulp
    .src(paths.archive.src)
    .pipe(zip(fileName))
    .pipe(size({ title: 'archiveProject' }))
    .pipe(gulp.dest(paths.archive.dest));
}

const taskFunction = gulp.series(clear, build, archiveProject);

export { taskFunction as archiveProject };
