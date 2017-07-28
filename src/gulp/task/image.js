const configuration = require('../configuration');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const pngquant = require('imagemin-pngquant');

gulp.task('image', () => {
    return gulp
        .src(configuration.path.input.image)
        .pipe(newer(configuration.path.output.image))
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(configuration.path.output.image));
});