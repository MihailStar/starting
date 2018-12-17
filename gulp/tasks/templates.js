import {paths, isDevelopment} from '../configuration.js';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import htmlBeautify from 'gulp-html-beautify';
import pug from 'gulp-pug';
import replace from 'gulp-replace';
import size from 'gulp-size';

function compileTemplates() {
  return gulp.src(paths.templates.src)
    .pipe(pug())
    .pipe(gulpIf(!isDevelopment, replace('DOCTYPE', 'doctype')))
    .pipe(gulpIf(!isDevelopment, htmlBeautify()))
    .pipe(gulpIf(!isDevelopment, size({
      title: 'size of compiled templates'
    })))
    .pipe(gulp.dest(paths.templates.dest));
}

export default compileTemplates;