import {paths} from '../configuration.js';
import {serverReload} from './server.js';
import fonts from './fonts.js';
import gulp from 'gulp';
import images from './images.js';
import imageToBase64 from './imageToBase64.js';
import scriptLibraries from './scriptLibraries.js';
import scripts from './scripts.js';
import sprite from './sprite.js';
import styles from './styles.js';
import templates from './templates.js';

function watch() {
  const watchFor = {
    fonts: [fonts, serverReload],
    images: [images, serverReload],
    imageToBase64: [imageToBase64],
    scriptLibraries: [scriptLibraries, serverReload],
    scripts: [scripts, serverReload],
    sprite: [sprite],
    styles: [styles],
    templates: [templates, serverReload]
  };
  Object.keys(watchFor).forEach((taskName) => {
    gulp.watch(
      paths[taskName].watch,
      gulp.series(...watchFor[taskName])
    );
  });
}

export default watch;