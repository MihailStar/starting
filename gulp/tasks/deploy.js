import { paths } from '../configuration.js';
import build from './build.js';
import clean from './clean.js';
import ghPages from 'gulp-gh-pages';
import gulp from 'gulp';

function deploy() {
  return gulp
    .src(paths.deploy.src)
    .pipe(ghPages({
      message: `${new Date().toISOString().replace(/:/g, '-')}`
    }));
}

export default gulp.series(
  clean,
  build,
  deploy
);
