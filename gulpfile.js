'use strict';

const gulp = require('gulp');

require('require-dir')('./gulp', {
    recurse: true
});

gulp.task('build', gulp.series('sprite:vector', gulp.parallel(
    'font',
    'html',
    'image',
    'script:library',
    'script:main',
    'sprite:raster',
    'style'
)));

gulp.task('default', gulp.series('clean', 'build', gulp.parallel(
    'server',
    'watch'
)));