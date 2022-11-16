/* eslint-disable import/no-extraneous-dependencies */

import autoprefixer from 'autoprefixer';
import dartSass from 'sass';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import postcss100vhFix from 'postcss-100vh-fix';
import postcssCsso from 'postcss-csso';
import postcssImport from 'postcss-import';
import postcssMediaMinmax from 'postcss-media-minmax';
import prettier from 'gulp-prettier';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import wait from 'gulp-wait';
import { isDevelopment, isProductionMinimized, paths } from '../configuration.js';
import { server } from './server.js';

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
        postcss([
          postcssImport(),
          postcss100vhFix(),
          postcssMediaMinmax(),
          autoprefixer(),
        ]),
        postcss([
          postcssImport(),
          postcss100vhFix(),
          postcssMediaMinmax(),
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
