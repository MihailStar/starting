'use strict';

const autoprefixer = require('autoprefixer'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    csso = require('postcss-csso'),
    del = require('del'),
    gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    inject = require('gulp-inject'),
    mergeStream = require('merge-stream'),
    mqpacker = require('css-mqpacker'),
    newer = require('gulp-newer'),
    pngquant = require('imagemin-pngquant'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    svgstore = require('gulp-svgstore'),
    uglify = require('gulp-uglify'),
    vinylBuffer = require('vinyl-buffer'),
    watch = require('gulp-watch');

const root = {
    input: 'src',
    output: 'dist'
};

const configuration = {

/* -----------------------------------------------------------
// configuration | babel
// --------------------------------------------------------- */

    babel: {
        presets: ['env']
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
            baseDir: root.output,
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
// configuration | isDevelopment
// --------------------------------------------------------- */

    isDevelopment: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',

/* -----------------------------------------------------------
// configuration | postcss
// --------------------------------------------------------- */

    postcss: [
        autoprefixer({
            cascade: false
        }),
        mqpacker({
            sort: true
        }),
        csso()
    ],

/* -----------------------------------------------------------
// configuration | path
// --------------------------------------------------------- */

    path: {
        clean: root.output,
        input: {
            font: `${root.input}/font/**/*.*`,
            html: `${root.input}/*.html`,
            image: [
                `${root.input}/image/**/*.*`,
                `!${root.input}/image/sprite/**/*.*`
            ],
            script: {
                lib: `${root.input}/script/lib/**/*.js`,
                main: [
                    `${root.input}/script/**/*.js`,
                    `!${root.input}/script/lib/**/*.js`
                ]
            },
            sprite: {
                raster: `${root.input}/image/sprite/*.png`,
                vector: `${root.input}/image/sprite/*.svg`
            },
            style: `${root.input}/style/main.scss`
        },
        output: {
            font: `${root.output}/font`,
            html: `${root.output}`,
            image: `${root.output}/image`,
            map: '.',
            script: {
                lib: `${root.output}/script`,
                main: `${root.output}/script`
            },
            sprite: {
                raster: `${root.output}/image/sprite`,
                style: `${root.input}/style/sprite`,
                vector: `${root.input}/template`
            },
            style: `${root.output}/style`
        },
        watch: {
            font: `${root.input}/font/**/*.*`,
            html: `${root.input}/**/*.html`,
            image: [
                `${root.input}/image/**/*.*`,
                `!${root.input}/image/sprite/**/*.*`
            ],
            script: {
                lib: `${root.input}/script/lib/**/*.js`,
                main: [
                    `${root.input}/script/**/*.js`,
                    `!${root.input}/script/lib/**/*.js`
                ]
            },
            sprite: {
                raster: `${root.input}/image/sprite/*.png`,
                vector: `${root.input}/image/sprite/*.svg`
            },
            style: `${root.input}/style/**/*.scss`
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
                sourceRoot: `/${root.input}/script`
            },
            style: {
                includeContent: false,
                sourceMappingURLPrefix: 'http://localhost:3000/style',
                sourceRoot: `/${root.input}/style`
            }
        }
    },

/* ------------------------------------------------------------
// configuration | spritesmith
// --------------------------------------------------------- */

    spritesmith: {
        // algorithm: 'top-down',
        cssName: 'sprite.css',
        // cssName: 'sprite.scss',
        imgName: 'sprite.png',
        // padding: 4,
        // retinaImgName: 'sprite@2x.png',
        // retinaSrcFilter: `${root.input}/image/sprite/*@2x.png`
    },

/* ------------------------------------------------------------
// configuration | svgstore
// --------------------------------------------------------- */

    svgstore: {
        inlineSvg: true
    },

/* ------------------------------------------------------------
// configuration | uglify
// --------------------------------------------------------- */

    uglify: {
        output: {
            quote_style: 3
        }
    }

};

/* ------------------------------------------------------------
// task | clean
// --------------------------------------------------------- */

gulp.task('clean', () => {
    return del(configuration.path.clean);
});

/* ------------------------------------------------------------
// task | font
// --------------------------------------------------------- */

gulp.task('font', () => {
    return gulp
        .src(configuration.path.input.font)
        .pipe(newer(configuration.path.output.font))
        .pipe(gulp.dest(configuration.path.output.font))
        .pipe(gulpIf(configuration.isDevelopment, browserSync.stream()));
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
        .pipe(gulpIf(configuration.isDevelopment, browserSync.stream()));
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
        .pipe(gulpIf(configuration.isDevelopment, browserSync.stream()));
});

/* ------------------------------------------------------------
// task | script:main
// --------------------------------------------------------- */

gulp.task('script:main', () => {
    return gulp
        .src(configuration.path.input.script.main)
        .pipe(gulpIf(configuration.isDevelopment, sourcemaps.init(configuration.sourcemaps.input)))
        .pipe(babel(configuration.babel))
        .pipe(concat(configuration.concat.script.main))
        .pipe(uglify(configuration.uglify))
        .pipe(gulpIf(configuration.isDevelopment, sourcemaps.write(configuration.path.output.map, configuration.sourcemaps.output.script)))
        .pipe(gulp.dest(configuration.path.output.script.main))
        .pipe(gulpIf(configuration.isDevelopment, browserSync.stream()));
});

/* ------------------------------------------------------------
// task | script:lib
// --------------------------------------------------------- */

gulp.task('script:lib', () => {
    return gulp
        .src(configuration.path.input.script.lib)
        .pipe(concat(configuration.concat.script.lib))
        .pipe(uglify(configuration.uglify))
        .pipe(gulp.dest(configuration.path.output.script.lib))
        .pipe(gulpIf(configuration.isDevelopment, browserSync.stream()));
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
    return gulp
        .src(`${configuration.path.output.sprite.vector}/_sprite.html`)
        .pipe(inject(spriteData, {
            transform: (filePath, file) => {
                file.contents.toString();
            }
        }))
        .pipe(gulp.dest(configuration.path.output.sprite.vector));
});

/* ------------------------------------------------------------
// task | style
// --------------------------------------------------------- */

gulp.task('style', () => {
    return gulp
        .src(configuration.path.input.style)
        .pipe(gulpIf(configuration.isDevelopment, sourcemaps.init(configuration.sourcemaps.input)))
        .pipe(sass(configuration.sass).on('error', sass.logError))
        .pipe(postcss(configuration.postcss))
        .pipe(rename(configuration.rename.style))
        .pipe(gulpIf(configuration.isDevelopment, sourcemaps.write(configuration.path.output.map, configuration.sourcemaps.output.style)))
        .pipe(gulp.dest(configuration.path.output.style))
        .pipe(gulpIf(configuration.isDevelopment, browserSync.stream()));
});

/* ------------------------------------------------------------
// task | build
// --------------------------------------------------------- */

gulp.task('build', gulp.series('sprite:vector', gulp.parallel(
    'font',
    'html',
    'image',
    'script:main',
    'script:lib',
    'sprite:raster',
    'style'
)));

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
    watch(configuration.path.watch.script.main, gulp.series('script:main'));
    watch(configuration.path.watch.script.lib, gulp.series('script:lib'));
    watch(configuration.path.watch.sprite.raster, gulp.series('sprite:raster'));
    watch(configuration.path.watch.sprite.vector, gulp.series('sprite:vector'));
    watch(configuration.path.watch.style, () => {
        setTimeout((gulp.series('style')), 100);
    });
});

/* ------------------------------------------------------------
// task | default
// --------------------------------------------------------- */

gulp.task('default', gulp.series('clean', 'build', gulp.parallel(
    'server',
    'watch'
)));