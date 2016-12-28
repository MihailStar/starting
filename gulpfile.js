'use strict';

/* -----------------------------------------------------------
// packages
// --------------------------------------------------------- */

var autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    del = require('del'),
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),

/* -----------------------------------------------------------
// config | autoprefixer
// --------------------------------------------------------- */

    autoprefixerConfig = {
        browsers: [
            '> 1%',
            'ie 10',
            'ie 11',
            'last 3 versions'
        ],
        cascade: false
    },

/* -----------------------------------------------------------
// config | browserSync
// --------------------------------------------------------- */

    browserSyncConfig = {
        logPrefix: 'browserSync',
        notify: false,
        online: false,
        open: false,
        port: 3000,
        reloadDebounce: 300,
        reloadDelay: 300,
        reloadOnRestart: true,
        server: {
            baseDir: 'dist',
            routes: {
                '/bower_components': 'bower_components',
                '/src': 'src'
            }
        },
        tunnel: false,
        ui: false
    },

/* ------------------------------------------------------------
// config | imagemin
// --------------------------------------------------------- */

    imageminConfig = {
        interlaced: true,
        progressive: true,
        svgoPlugins: [{
            removeViewBox: false
        }],
        use: [pngquant()]
    },

/* ------------------------------------------------------------
// config | paths
// --------------------------------------------------------- */

    paths = {
        clean: 'dist',
        input: {
            fonts: 'src/fonts/**/*.*',
            html: 'src/*.html',
            images: 'src/images/**/*.*',
            scripts: 'src/scripts/**/*.js',
            scriptsRoot: '/src/scripts/', // sourcemaps sourceRoot
            styles: 'src/styles/main.scss',
            stylesRoot: '/src/styles/' // sourcemaps sourceRoot
        },
        output: {
            fonts: 'dist/fonts',
            html: 'dist',
            images: 'dist/images',
            maps: '.',
            scripts: 'dist/scripts',
            styles: 'dist/styles'
        },
        watch: {
            fonts: 'src/fonts/**/*.*',
            html: 'src/**/*.html',
            images: 'src/images/**/*.*',
            scripts: 'src/scripts/**/*.js',
            styles: 'src/styles/**/*.scss'
        }
    };

/* ------------------------------------------------------------
// task | build
// --------------------------------------------------------- */

gulp.task('build:fonts', function () {
    return gulp.src(paths.input.fonts)
        .pipe(newer(paths.output.fonts))
        .pipe(gulp.dest(paths.output.fonts))
        .pipe(browserSync.stream());
});

gulp.task('build:html', function () {
    return gulp.src(paths.input.html)
        .pipe(newer(paths.output.html))
        .pipe(rigger())
        .pipe(gulp.dest(paths.output.html))
        .pipe(browserSync.stream());
});

gulp.task('build:images', function () {
    return gulp.src(paths.input.images)
        .pipe(newer(paths.output.images))
        .pipe(imagemin(imageminConfig))
        .pipe(gulp.dest(paths.output.images))
        .pipe(browserSync.stream());
});

gulp.task('build:scripts', function () {
    return gulp.src(paths.input.scripts)
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write(paths.output.maps, {
            includeContent: false,
            sourceMappingURLPrefix: 'http://localhost:' + browserSyncConfig.port + '/scripts',
            sourceRoot: paths.input.scriptsRoot
        }))
        .pipe(gulp.dest(paths.output.scripts))
        .pipe(browserSync.stream());
});

gulp.task('build:styles', function () {
    return gulp.src(paths.input.styles)
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sass())
        .pipe(autoprefixer(autoprefixerConfig))
        .pipe(csso())
        .pipe(rename({
            basename: 'main',
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(sourcemaps.write(paths.output.maps, {
            includeContent: false,
            sourceMappingURLPrefix: 'http://localhost:' + browserSyncConfig.port + '/styles',
            sourceRoot: paths.input.stylesRoot
        }))
        .pipe(gulp.dest(paths.output.styles))
        .pipe(browserSync.stream());
});

gulp.task('build', gulp.parallel(
    'build:fonts',
    'build:html',
    'build:images',
    'build:scripts',
    'build:styles'
));

/* ------------------------------------------------------------
// task | clean
// --------------------------------------------------------- */

gulp.task('clean', function () {
    return del(paths.clean);
});

/* ------------------------------------------------------------
// task | server
// --------------------------------------------------------- */

gulp.task('server', function () {
    browserSync.init(browserSyncConfig);
});

/* ------------------------------------------------------------
// task | watch
// --------------------------------------------------------- */

gulp.task('watch', function () {
    watch(paths.watch.fonts, gulp.series('build:fonts'));
    watch(paths.watch.html, gulp.series('build:html'));
    watch(paths.watch.images, gulp.series('build:images'));
    watch(paths.watch.scripts, gulp.series('build:scripts'));
    watch(paths.watch.styles, gulp.series('build:styles'));
});

/* ------------------------------------------------------------
// task | default
// --------------------------------------------------------- */

gulp.task('default', gulp.series('clean', gulp.parallel('build', 'server', 'watch')));