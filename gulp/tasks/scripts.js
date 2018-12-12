import {paths} from '../configuration.js';
import gulp from 'gulp';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.babel.js';
import webpackStream from 'webpack-stream';

function compileScripts() {
  return gulp.src(paths.scripts.src)
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
}

compileScripts.displayName = 'compile scripts';

export default compileScripts;