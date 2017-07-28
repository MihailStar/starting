const configuration = require('../configuration');
const gulp = require('gulp');
const watch = require('gulp-watch');

gulp.task('watch', () => {
    watch(configuration.path.watch.font, gulp.series('font', 'server:reload'));
    watch(configuration.path.watch.html, gulp.series('html', 'server:reload'));
    watch(configuration.path.watch.image, gulp.series('image', 'server:reload'));
    watch(configuration.path.watch.script.main, gulp.series('script:main', 'server:reload'));
    watch(configuration.path.watch.script.library, gulp.series('script:library', 'server:reload'));
    watch(configuration.path.watch.sprite.raster, gulp.series('sprite:raster'));
    watch(configuration.path.watch.sprite.vector, gulp.series('sprite:vector'));
    watch(configuration.path.watch.style, () => {
        setTimeout((gulp.series('style', 'server:reload')), 100);
    });
});