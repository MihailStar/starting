/* eslint-disable import/no-extraneous-dependencies */
import ghPages from 'gulp-gh-pages';
import gulp from 'gulp';
import { paths } from '../configuration';
import build from './build';
import clean from './clean';

const commitName = `deploy: ${new Date()
  .toISOString()
  .replace(/[T:]/g, '-')
  .slice(0, -5)}`;

function deploy() {
  return gulp
    .src(paths.deploy.src)
    .pipe(ghPages({
      message: commitName,
    }));
}

export default gulp.series(
  clean,
  build,
  deploy,
);
