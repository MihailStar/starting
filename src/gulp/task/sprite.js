const configuration = require('../configuration');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const inject = require('gulp-inject');
const mergeStream = require('merge-stream');
const rename = require('gulp-rename');
const spritesmith = require('gulp.spritesmith');
const svgstore = require('gulp-svgstore');
const vinylBuffer = require('vinyl-buffer');

gulp.task('sprite:raster', () => {
    let imageStream,
        styleStream,
        spriteData;
    spriteData = gulp
        .src(configuration.path.input.sprite.raster)
        .pipe(spritesmith({
            // algorithm: 'top-down',
            cssName: 'sprite.css',
            // cssName: 'sprite.scss',
            imgName: 'sprite.png',
            // padding: 4,
            // retinaImgName: 'sprite@2x.png',
            // retinaSrcFilter: `${configuration.root.input}/image/sprite/*@2x.png`
        }));
    imageStream = spriteData.img
        .pipe(vinylBuffer())
        .pipe(imagemin(configuration.imagemin))
        .pipe(gulp.dest(configuration.path.output.sprite.raster));
    styleStream = spriteData.css
        .pipe(gulpIf(configuration.isDevelopment, gulp.dest(configuration.path.output.sprite.raster)));
    return mergeStream(imageStream, styleStream);
});

gulp.task('sprite:vector', () => {
    let spriteData;
    spriteData = gulp
        .src(configuration.path.input.sprite.vector)
        .pipe(rename({
            prefix: 'icon-'
        }))
        .pipe(imagemin(configuration.imagemin))
        .pipe(svgstore({
            inlineSvg: true
        }));
    return gulp
        .src(`${configuration.path.output.sprite.vector}/sprite.html`)
        .pipe(inject(spriteData, {
            transform: (filePath, file) => {
                file.contents.toString();
            }
        }))
        .pipe(gulp.dest(configuration.path.output.sprite.vector));
});