const gulp = require('gulp');

gulp.task('build', gulp.series('image:sprite:vector', gulp.parallel(
    'font',
    'html',
    'image:main',
    'image:sprite:raster',
    'script:library',
    'script:main',
    'style'
)));