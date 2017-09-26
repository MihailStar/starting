const babel = require('gulp-babel');
const concat = require('gulp-concat');
const configuration = require('../configuration');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

gulp.task('script:library', () => {
    return gulp
        .src(configuration.path.input.script.library)
        .pipe(concat('library.min.js'))
        .pipe(gulpIf(!configuration.isDevelopment, uglify({
            output: {
                quote_style: 3
            }
        })))
        .pipe(gulp.dest(configuration.path.output.script.library));
});

gulp.task('script:main', () => {
    return gulp
        .src(configuration.path.input.script.main)
        .pipe(gulpIf(configuration.isDevelopment, sourcemaps.init({
            loadMaps: true
        })))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('main.min.js'))
        .pipe(gulpIf(!configuration.isDevelopment, uglify({
            output: {
                quote_style: 3
            }
        })))
        .pipe(gulpIf(configuration.isDevelopment, sourcemaps.write(configuration.path.output.map, {
            includeContent: false,
            sourceMappingURLPrefix: `http://localhost:${configuration.port}/script`,
            sourceRoot: `/${configuration.root.input}/script`
        })))
        .pipe(gulp.dest(configuration.path.output.script.main));
});