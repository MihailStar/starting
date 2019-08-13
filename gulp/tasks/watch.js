/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import { paths } from '../configuration';
import { reloadServer } from './server';
import compileFonts from './fonts';
import compileImages from './images';
import compileScripts from './scripts';
import compileStyles from './styles';
import compileTemplates from './templates';
import convertImageToBase64 from './base64';
import generateSprite from './sprite';

function watch() {
  const watchFor = {
    base64: [convertImageToBase64],
    fonts: [compileFonts, reloadServer],
    images: [compileImages, reloadServer],
    scripts: [compileScripts, reloadServer],
    sprite: [generateSprite, reloadServer],
    styles: [compileStyles],
    templates: [compileTemplates, reloadServer],
  };
  Object.keys(watchFor).forEach((path) => {
    gulp.watch(paths[path].watch, gulp.series(...watchFor[path]));
  });
}

export default watch;
