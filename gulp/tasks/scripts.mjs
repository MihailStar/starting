/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';

import { paths } from '../configuration.mjs';
import { webpackConfiguration } from '../../webpack.config.mjs';

function compileScripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(webpackStream(webpackConfiguration, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
}

export { compileScripts };
