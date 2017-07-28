const configuration = require('../configuration');
const gulp = require('gulp');
const newer = require('gulp-newer');

gulp.task('font', () => {
    return gulp
        .src(configuration.path.input.font)
        .pipe(newer(configuration.path.output.font))
        .pipe(gulp.dest(configuration.path.output.font));
});