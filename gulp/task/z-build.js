const gulp = require('gulp');

gulp.task('build', gulp.parallel(
    'font',
    'html',
    'image:main',
    'script:library',
    'script:main',
    'style'
));