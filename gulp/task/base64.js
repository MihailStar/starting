const configuration = require('../configuration');
const gulp = require('gulp');
const imageDataURI = require('gulp-image-data-uri');

gulp.task('base64', () => {
    return gulp
        .src('src/image/base64/**/*.*')
        .pipe(imageDataURI())
        .pipe(gulp.dest('dist/image/base64'));
});