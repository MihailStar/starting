const configuration = require('../configuration');
const frontMatter = require('gulp-front-matter');
const gulp = require('gulp');
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
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(configuration.path.output.html));
});