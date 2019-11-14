/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import prettier from 'gulp-prettier';
import pug from 'gulp-pug';
import replace from 'gulp-replace';
import size from 'gulp-size';
import pugbem from '../gulp-pugbem';
import { paths, isDevelopment, isProductionMinimized } from '../configuration';

function compileTemplates() {
  return gulp
    .src(paths.templates.src)
    .pipe(pug({
      plugins: [pugbem],
    }))
    .pipe(gulpIf(
      !isDevelopment && !isProductionMinimized.templates,
      prettier(),
    ))
    .pipe(gulpIf(
      !isDevelopment,
      replace(/\n* *<!-- *display: *(?:block|inline) *-->/g, ''),
    ))
    .pipe(gulpIf(!isDevelopment, size({
      title: 'compileTemplates',
    })))
    .pipe(gulp.dest(paths.templates.dest));
}

export default compileTemplates;
