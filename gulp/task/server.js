const browserSync = require('browser-sync').create();
const configuration = require('../configuration');
const gulp = require('gulp');

gulp.task('server', () => {
    browserSync.init({
        logPrefix: 'browserSync',
        notify: false,
        online: false,
        open: false,
        port: configuration.port,
        reloadDebounce: 100,
        reloadDelay: 100,
        reloadOnRestart: true,
        server: {
            baseDir: configuration.root.output,
            routes: {
                '/bower_components': 'bower_components',
                '/src': configuration.root.input
            }
        },
        tunnel: false,
        ui: false
    });
});

gulp.task('server:reload', () => {
    return browserSync.reload();
});