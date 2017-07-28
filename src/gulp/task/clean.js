const configuration = require('../configuration');
const del = require('del');
const gulp = require('gulp');

gulp.task('clean', (done) => {
    del(configuration.root.output);
    done();
});