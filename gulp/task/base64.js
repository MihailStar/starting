const configuration = require('../configuration');
const gulp = require('gulp');
const imageDataURI = require('gulp-image-data-uri');
const imagemin = require('gulp-imagemin');

gulp.task('base64', () => {
    return gulp
        .src(configuration.path.input.base64)
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [{
                    cleanupIDs: false
                }]
            })
        ]))
        .pipe(imageDataURI())
        .pipe(gulp.dest(configuration.path.output.base64));
});