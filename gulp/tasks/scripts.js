/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import { configuration as webpackConfiguration } from '../../webpack.config.js';
import { paths } from '../configuration.js';

function compileScripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(webpackStream(webpackConfiguration, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
}

export { compileScripts };
