const configuration = require('../configuration');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const rigger = require('gulp-rigger');

gulp.task('html', () => {
    return gulp
        .src(configuration.path.input.html)
        .pipe(rigger())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(configuration.path.output.html));
});