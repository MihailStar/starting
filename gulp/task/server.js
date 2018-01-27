const browserSync = require('browser-sync').create();
const configuration = require('../configuration');
const gulp = require('gulp');

gulp.task('server', () => {
    browserSync.init({
        logPrefix: 'browser-sync',
        notify: false,
        online: false,
        open: false,
        port: configuration.port,
        reloadOnRestart: true,
        server: {
            baseDir: configuration.root.output,
            routes: {
                '/bower_components': 'bower_components',
                [`/${configuration.root.input}`]: configuration.root.input
            }
        },
        tunnel: false,
        ui: false
    });
});

gulp.task('server:reload', (done) => {
    browserSync.reload();
    return done();
});