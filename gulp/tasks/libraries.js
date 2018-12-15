import {paths, isDevelopment} from '../configuration.js';
import concat from 'gulp-concat';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import size from 'gulp-size';
import uglifyComposer from 'gulp-uglify/composer';
import uglifyEs from 'uglify-es';

const uglify = uglifyComposer(uglifyEs, console.warn);

function compileScriptLibraries() {
  return gulp.src(paths.libraries.src)
    .pipe(concat('libraries.min.js'))
    .pipe(gulpIf(!isDevelopment, uglify()))
    .pipe(gulpIf(!isDevelopment, size({
      title: 'script libraries size'
    })))
    .pipe(gulp.dest(paths.libraries.dest));
}

export default compileScriptLibraries;