import {paths, isDevelopment} from '../configuration.js';
import concat from 'gulp-concat';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import size from 'gulp-size';
import terser from 'terser';
import uglifyComposer from 'gulp-uglify/composer';

const uglify = uglifyComposer(terser, console.warn);

function compileScriptLibraries() {
  return gulp.src(paths.libraries.src)
    .pipe(concat('libraries.min.js'))
    .pipe(gulpIf(!isDevelopment, uglify()))
    .pipe(gulpIf(!isDevelopment, size({
      title: 'size of compiled script libraries'
    })))
    .pipe(gulp.dest(paths.libraries.dest));
}

export default compileScriptLibraries;