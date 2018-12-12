import {paths, isDevelopment} from '../configuration.js';
import concat from 'gulp-concat';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import uglifyComposer from 'gulp-uglify/composer';
import uglifyEs from 'uglify-es';

const uglify = uglifyComposer(uglifyEs, console.warn);

function compileScriptLibraries() {
  return gulp.src(paths.scriptLibraries.src)
    .pipe(concat('libraries.min.js'))
    .pipe(gulpIf(!isDevelopment, uglify()))
    .pipe(gulp.dest(paths.scriptLibraries.dest));
}

compileScriptLibraries.displayName = 'compile script libraries';

export default compileScriptLibraries;