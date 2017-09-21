const configuration = require('../configuration');
const frontMatter = require('gulp-front-matter');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const htmlmin = require('gulp-htmlmin');
const rigger = require('gulp-rigger');
const swig = require('gulp-swig');

gulp.task('html', () => {
    return gulp
        .src(configuration.path.input.html)
        .pipe(rigger())
        .pipe(frontMatter({
            property: 'data',
            remove: true
        }))
        .pipe(swig({
            defaults: {
                cache: false
            }
        }))
        .pipe(gulpIf(!configuration.isDevelopment, htmlmin({
            collapseWhitespace: true,
            removeComments: true
        })))
        .pipe(gulp.dest(configuration.path.output.html));
});