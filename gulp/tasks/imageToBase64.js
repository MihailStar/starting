import {paths, imageminConfig} from '../configuration.js';
import gulp from 'gulp';
import imageDataURI from 'gulp-image-data-uri';
import imagemin from 'gulp-imagemin';

function convertImageToBase64() {
  return gulp.src(paths.imageToBase64.src)
    .pipe(imagemin(imageminConfig))
    .pipe(imageDataURI())
    .pipe(gulp.dest(paths.imageToBase64.dest));
}

convertImageToBase64.displayName = 'image to base64';

export default convertImageToBase64;