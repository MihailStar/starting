const configuration = require('../configuration');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');

gulp.task('image', () => {
    return gulp
        .src(configuration.path.input.image)
        .pipe(newer(configuration.path.output.image))
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
        .pipe(gulp.dest(configuration.path.output.image));
});