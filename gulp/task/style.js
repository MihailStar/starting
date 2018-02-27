const browserSync = require('./server.js');
const configuration = require('../configuration');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const wait = require('gulp-wait');

const autoprefixer = require('autoprefixer');
const cssMqpacker = require('css-mqpacker');
const csso = require('postcss-csso');

gulp.task('style', () => {
    return gulp
        .src(configuration.path.input.style)
        .pipe(wait(100))
        .pipe(gulpIf(configuration.isDevelopment, sourcemaps.init({
            loadMaps: true
        })))
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulpIf(!configuration.isDevelopment, postcss([
            autoprefixer({
                cascade: false,
                remove: false
            }),
            cssMqpacker({
                sort: true
            }),
            csso()
        ])))
        .pipe(rename({
            basename: 'main',
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(gulpIf(configuration.isDevelopment, sourcemaps.write(configuration.path.output.map, {
            includeContent: false,
            sourceMappingURLPrefix: `http://localhost:${configuration.port}/style`,
            sourceRoot: `/${configuration.directory.input}/style`
        })))
        .pipe(gulp.dest(configuration.path.output.style))
        .pipe(browserSync.stream());
});