'use strict';

const autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    del = require('del'),
    gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    inject = require('gulp-inject'),
    mergeStream = require('merge-stream'),
    newer = require('gulp-newer'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    svgstore = require('gulp-svgstore'),
    uglify = require('gulp-uglify'),
    vinylBuffer = require('vinyl-buffer'),
    watch = require('gulp-watch');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const configuration = {

/* -----------------------------------------------------------
// configuration | autoprefixer
// --------------------------------------------------------- */

    autoprefixer: {
        browsers: [
            '> 1%',
            'ie 10',
            'ie 11',
            'last 3 versions'
        ],
        cascade: false
    },

/* -----------------------------------------------------------
// configuration | browserSync
// --------------------------------------------------------- */

    browserSync: {
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

/* -----------------------------------------------------------
// configuration | concat
// --------------------------------------------------------- */

    concat: {
        script: {
            lib: 'lib.min.js',
            main: 'main.min.js'
        }
    },

/* -----------------------------------------------------------
// configuration | htmlmin
// --------------------------------------------------------- */

    htmlmin: {
        collapseWhitespace: true,
        removeComments: true
    },

/* -----------------------------------------------------------
// configuration | imagemin
// --------------------------------------------------------- */

    imagemin: {
        interlaced: true,
        progressive: true,
        svgoPlugins: [{
            removeViewBox: false
        }],
        use: [pngquant()]
    },

/* -----------------------------------------------------------
// configuration | path
// --------------------------------------------------------- */

    path: {
        clean: 'dist',
        input: {
            font: 'src/font/**/*.*',
            html: 'src/*.html',
            image: [
                'src/image/**/*.*',
                '!src/image/sprite/**/*.*'
            ],
            script: {
                lib: 'src/script/lib/**/*.js',
                main: [
                    'src/script/**/*.js',
                    '!src/script/lib/**/*.js'
                ]
            },
            sprite: {
                raster: 'src/image/sprite/*.png',
                vector: 'src/image/sprite/*.svg'
            },
            style: 'src/style/main.scss'
        },
        output: {
            font: 'dist/font',
            html: 'dist',
            image: 'dist/image',
            map: '.',
            script: {
                lib: 'dist/script',
                main: 'dist/script'
            },
            sprite: {
                raster: 'dist/image/sprite',
                style: 'src/style/sprite',
                vector: 'src/template'
            },
            style: 'dist/style'
        },
        watch: {
            font: 'src/font/**/*.*',
            html: 'src/**/*.html',
            image: [
                'src/image/**/*.*',
                '!src/image/sprite/**/*.*'
            ],
            script: {
                lib: 'src/script/lib/**/*.js',
                main: [
                    'src/script/**/*.js',
                    '!src/script/lib/**/*.js'
                ]
            },
            style: 'src/style/**/*.scss'
        }
    },

/* -----------------------------------------------------------
// configuration | rename
// --------------------------------------------------------- */

    rename: {
        sprite: {
            prefix: 'icon-'
        },
        style: {
            basename: 'main',
            suffix: '.min',
            extname: '.css'
        }
    },

/* ------------------------------------------------------------
// configuration | sass
// --------------------------------------------------------- */

    sass: {
        outputStyle: 'compressed'
    },

/* ------------------------------------------------------------
// configuration | sourcemaps
// --------------------------------------------------------- */

    sourcemaps: {
        input: {
            loadMaps: true
        },
        output: {
            script: {
                includeContent: false,
                sourceMappingURLPrefix: 'http://localhost:3000/script',
                sourceRoot: '/src/script/'
            },
            style: {
                includeContent: false,
                sourceMappingURLPrefix: 'http://localhost:3000/style',
                sourceRoot: '/src/style/'
            }
        }
    },

/* ------------------------------------------------------------
// configuration | spritesmith
// --------------------------------------------------------- */

    spritesmith: {
        cssName: 'sprite.css',
        // cssName: 'sprite.scss',
        imgName: 'sprite.png',
        // padding: 2,
        // retinaImgName: 'sprite@2x.png',
        // retinaSrcFilter: 'src/image/sprite/*@2x.png'
    },

/* ------------------------------------------------------------
// configuration | svgstore
// --------------------------------------------------------- */

    svgstore: {
        inlineSvg: true
    }

};

/* ------------------------------------------------------------
// task | font
// --------------------------------------------------------- */

gulp.task('font', () => {
    return gulp
        .src(configuration.path.input.font)
        .pipe(newer(configuration.path.output.font))
        .pipe(gulp.dest(configuration.path.output.font))
        .pipe(gulpIf(isDevelopment, browserSync.stream()));
});

/* ------------------------------------------------------------
// task | html
// --------------------------------------------------------- */

gulp.task('html', () => {
    return gulp
        .src(configuration.path.input.html)
        .pipe(rigger())
        .pipe(htmlmin(configuration.htmlmin))
        .pipe(gulp.dest(configuration.path.output.html))
        .pipe(gulpIf(isDevelopment, browserSync.stream()));
});

/* ------------------------------------------------------------
// task | image
// --------------------------------------------------------- */

gulp.task('image', () => {
    return gulp
        .src(configuration.path.input.image)
        .pipe(newer(configuration.path.output.image))
        .pipe(imagemin(configuration.imagemin))
        .pipe(gulp.dest(configuration.path.output.image))
        .pipe(gulpIf(isDevelopment, browserSync.stream()));
});

/* ------------------------------------------------------------
// task | script
// --------------------------------------------------------- */

gulp.task('script', () => {
    return gulp
        .src(configuration.path.input.script.main)
        .pipe(gulpIf(isDevelopment, sourcemaps.init(configuration.sourcemaps.input)))
        .pipe(concat(configuration.concat.script.main))
        .pipe(uglify())
        .pipe(gulpIf(isDevelopment, sourcemaps.write(configuration.path.output.map, configuration.sourcemaps.output.script)))
        .pipe(gulp.dest(configuration.path.output.script.main))
        .pipe(gulpIf(isDevelopment, browserSync.stream()));
});

/* ------------------------------------------------------------
// task | script:lib
// --------------------------------------------------------- */

gulp.task('script:lib', () => {
    return gulp
        .src(configuration.path.input.script.lib)
        .pipe(concat(configuration.concat.script.lib))
        .pipe(uglify())
        .pipe(gulp.dest(configuration.path.output.script.lib))
        .pipe(gulpIf(isDevelopment, browserSync.stream()));
});

/* ------------------------------------------------------------
// task | sprite:raster
// --------------------------------------------------------- */

gulp.task('sprite:raster', () => {
    let imageStream,
        styleStream,
        spriteData;
    spriteData = gulp
        .src(configuration.path.input.sprite.raster)
        .pipe(spritesmith(configuration.spritesmith));
    imageStream = spriteData.img
        .pipe(vinylBuffer())
        .pipe(imagemin(configuration.imagemin))
        .pipe(gulp.dest(configuration.path.output.sprite.raster));
    styleStream = spriteData.css
        .pipe(gulp.dest(configuration.path.output.sprite.style));
    return mergeStream(imageStream, styleStream);
});

/* ------------------------------------------------------------
// task | sprite:vector
// --------------------------------------------------------- */

gulp.task('sprite:vector', () => {
    let spriteData;
    spriteData = gulp
        .src(configuration.path.input.sprite.vector)
        .pipe(rename(configuration.rename.sprite))
        .pipe(imagemin(configuration.imagemin))
        .pipe(svgstore(configuration.svgstore));
    function fileContents(filePath, file) {
        return file.contents.toString();
    }
    return gulp
        .src(configuration.path.output.sprite.vector + '/_sprite.html')
        .pipe(inject(spriteData, {
            transform: fileContents
        }))
        .pipe(gulp.dest(configuration.path.output.sprite.vector));
});

/* ------------------------------------------------------------
// task | style
// --------------------------------------------------------- */

gulp.task('style', () => {
    return gulp
        .src(configuration.path.input.style)
        .pipe(gulpIf(isDevelopment, sourcemaps.init(configuration.sourcemaps.input)))
        .pipe(sass(configuration.sass).on('error', sass.logError))
        .pipe(autoprefixer(configuration.autoprefixer))
        .pipe(gulpIf(!isDevelopment, csso()))
        .pipe(rename(configuration.rename.style))
        .pipe(gulpIf(isDevelopment, sourcemaps.write(configuration.path.output.map, configuration.sourcemaps.output.style)))
        .pipe(gulp.dest(configuration.path.output.style))
        .pipe(gulpIf(isDevelopment, browserSync.stream()));
});

/* ------------------------------------------------------------
// task | build
// --------------------------------------------------------- */

gulp.task('build', gulp.series('sprite:vector', gulp.parallel(
    'font',
    'html',
    'image',
    'sprite:raster',
    'script',
    'script:lib',
    'style'
)));

/* ------------------------------------------------------------
// task | clean
// --------------------------------------------------------- */

gulp.task('clean', () => {
    return del(configuration.path.clean);
});

/* ------------------------------------------------------------
// task | server
// --------------------------------------------------------- */

gulp.task('server', () => {
    browserSync.init(configuration.browserSync);
});

/* ------------------------------------------------------------
// task | watch
// --------------------------------------------------------- */

gulp.task('watch', () => {
    watch(configuration.path.watch.font, gulp.series('font'));
    watch(configuration.path.watch.html, gulp.series('html'));
    watch(configuration.path.watch.image, gulp.series('image'));
    watch(configuration.path.watch.script.main, gulp.series('script'));
    watch(configuration.path.watch.script.lib, gulp.series('script:lib'));
    watch(configuration.path.watch.style, () => {
        setTimeout((gulp.series('style')), 100)
    });
});

/* ------------------------------------------------------------
// task | default
// --------------------------------------------------------- */

gulp.task('default', gulp.series('clean', 'build', gulp.parallel(
    'server',
    'watch'
)));