const configuration = require('../configuration');
const del = require('del');
const gulp = require('gulp');

gulp.task('clean', () => {
    return del(configuration.directory.output);
});