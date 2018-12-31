import { paths, isDevelopment } from '../configuration.js';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import prettier from 'gulp-prettier';
import pug from 'gulp-pug';
import replace from 'gulp-replace';
import size from 'gulp-size';

function compileTemplates() {
  return gulp
    .src(paths.templates.src)
    .pipe(pug())
    .pipe(gulpIf(!isDevelopment, replace(/<\/script>/g, '</script>\n')))
    .pipe(gulpIf(!isDevelopment, prettier()))
    .pipe(gulpIf(!isDevelopment, size({
      title: 'compileTemplates size'
    })))
    .pipe(gulp.dest(paths.templates.dest));
}

export default compileTemplates;
