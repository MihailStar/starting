import { paths } from '../configuration.js';
import { reloadServer } from './server.js';
import compileFonts from './fonts.js';
import compileImages from './images.js';
import compileScriptLibraries from './libraries.js';
import compileScripts from './scripts.js';
import compileStyles from './styles.js';
import compileTemplates from './templates.js';
import convertImageToBase64 from './base64.js';
import generateSprite from './sprite.js';
import gulp from 'gulp';

function watch() {
  const watchFor = {
    base64: [convertImageToBase64],
    fonts: [compileFonts, reloadServer],
    images: [compileImages, reloadServer],
    libraries: [compileScriptLibraries, reloadServer],
    scripts: [compileScripts, reloadServer],
    sprite: [generateSprite],
    styles: [compileStyles],
    templates: [compileTemplates, reloadServer]
  };
  Object.keys(watchFor).forEach((path) => {
    gulp.watch(paths[path].watch, gulp.series(...watchFor[path]));
  });
}

export default watch;
