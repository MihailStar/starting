const configuration = require('../configuration');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const htmlmin = require('gulp-htmlmin');
const rigger = require('gulp-rigger');

gulp.task('html', () => {
    return gulp
        .src(configuration.path.input.html)
        .pipe(rigger())
        .pipe(gulpIf(!configuration.isDevelopment, htmlmin({
            collapseWhitespace: true,
            removeComments: true
        })))
        .pipe(gulp.dest(configuration.path.output.html));
});