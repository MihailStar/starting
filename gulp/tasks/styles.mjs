/* eslint-disable import/no-extraneous-dependencies */

import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import gulp from 'gulp';
import wait from 'gulp-wait';
import gulpIf from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import postcssImport from 'postcss-import';
import postcss100vhFix from 'postcss-100vh-fix';
import autoprefixer from 'autoprefixer';
import postcssCsso from 'postcss-csso';
import prettier from 'gulp-prettier';
import size from 'gulp-size';
import {
  paths,
  isDevelopment,
  isProductionMinimized,
} from '../configuration.mjs';
import { server } from './server.mjs';

const sass = gulpSass(dartSass);

function compileStyles() {
  return gulp
    .src(paths.styles.src)
    .pipe(wait(100))
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(
      gulpIf(
        isDevelopment,
        postcss([postcssImport(), postcss100vhFix(), autoprefixer()]),
        postcss([
          postcssImport(),
          postcss100vhFix(),
          autoprefixer(),
          postcssCsso({
            comments: false,
          }),
        ])
      )
    )
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulpIf(!isDevelopment && !isProductionMinimized.styles, prettier()))
    .pipe(
      gulpIf(
        !isDevelopment,
        size({
          title: 'compileStyles',
        })
      )
    )
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(gulpIf(isDevelopment, server.stream()));
}

export { compileStyles };
