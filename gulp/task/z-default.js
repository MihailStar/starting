const gulp = require('gulp');

gulp.task('default', gulp.series('clean', 'build', gulp.parallel(
    'server',
    'watch'
)));