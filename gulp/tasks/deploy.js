import {paths} from '../configuration.js';
import build from './build.js';
import clean from './clean.js';
import ghPages from 'gulp-gh-pages';
import gulp from 'gulp';

function deploy() {
  return gulp.src(paths.deploy.src)
    .pipe(ghPages());
}

export default gulp.series(
  clean,
  build,
  deploy
);