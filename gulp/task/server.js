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
            baseDir: configuration.directory.output,
            routes: {
                [`/${configuration.directory.input}`]: configuration.directory.input
            }
        },
        ui: false
    });
});

gulp.task('server:reload', (done) => {
    browserSync.reload();
    return done();
});

module.exports = browserSync;