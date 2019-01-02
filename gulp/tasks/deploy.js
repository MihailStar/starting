/* eslint-disable import/no-extraneous-dependencies */
import ghPages from 'gulp-gh-pages';
import gulp from 'gulp';
import { paths } from '../configuration';
import build from './build';
import clean from './clean';

function deploy() {
  return gulp
    .src(paths.deploy.src)
    .pipe(ghPages({
      message: `${new Date().toISOString().replace(/:/g, '-')}`,
    }));
}

export default gulp.series(
  clean,
  build,
  deploy,
);
