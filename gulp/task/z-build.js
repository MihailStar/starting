const gulp = require('gulp');

gulp.task('build', gulp.series('sprite:vector', gulp.parallel(
    'font',
    'html',
    'image',
    'script:library',
    'script:main',
    'sprite:raster',
    'style'
)));