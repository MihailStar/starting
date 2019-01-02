/* eslint-disable import/no-extraneous-dependencies */
import concat from 'gulp-concat';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import size from 'gulp-size';
import terser from 'terser';
import uglifyComposer from 'gulp-uglify/composer';
import { paths, isDevelopment } from '../configuration';

// eslint-disable-next-line no-console
const uglify = uglifyComposer(terser, console.warn);

function compileScriptLibraries() {
  return gulp
    .src(paths.libraries.src)
    .pipe(concat('libraries.min.js'))
    .pipe(gulpIf(!isDevelopment, uglify()))
    .pipe(gulpIf(!isDevelopment, size({
      title: 'compileScriptLibraries',
    })))
    .pipe(gulp.dest(paths.libraries.dest));
}

export default compileScriptLibraries;
