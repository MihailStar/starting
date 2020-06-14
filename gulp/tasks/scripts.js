/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import { paths } from '../configuration.js';
import webpackConfig from '../../webpack.config.js';

function compileScripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
}

export default compileScripts;
