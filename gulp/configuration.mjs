/* eslint-disable import/no-extraneous-dependencies */

import {
  gifsicle as imageminGifsicle,
  mozjpeg as imageminMozjpeg,
  optipng as imageminOptipng,
  svgo as imageminSvgo,
} from 'gulp-imagemin';
import imageminWebp from 'imagemin-webp';

const isDevelopment =
  process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development';

const directory = {
  src: './src',
  dest: './dist',
};

const paths = {
  archive: {
    src: `${directory.dest}/**/*`,
    dest: directory.dest,
    watch: '',
  },
  base64: {
    src: `${directory.src}/images/base64/**/*.{gif,jpg,png,svg,webp}`,
    dest: `${directory.dest}/images/base64`,
    get watch() {
      return this.src;
    },
  },
  fonts: {
    src: `${directory.src}/fonts/**/*.{eot,svg,ttf,woff,woff2}`,
    dest: `${directory.dest}/fonts`,
    get watch() {
      return this.src;
    },
  },
  images: {
    src: [
      `${directory.src}/images/**/*.{gif,ico,jpg,png,svg,webp}`,
      `!${directory.src}/images/base64/**/*.{gif,jpg,png,svg,webp}`,
      `!${directory.src}/images/sprite/**/*.svg`,
      `${directory.src}/components/**/*.{gif,ico,jpg,png,svg,webp}`,
    ],
    dest: `${directory.dest}/images`,
    get watch() {
      return this.src;
    },
  },
  scripts: {
    src: `${directory.src}/scripts/main.{js,ts}`,
    dest: `${directory.dest}/scripts`,
    watch: [
      `${directory.src}/scripts/**/*.{js,ts}`,
      `${directory.src}/components/**/*.{js,ts}`,
    ],
  },
  sprite: {
    src: `${directory.src}/images/sprite/**/*.svg`,
    dest: `${directory.dest}/images/sprite`,
    get watch() {
      return this.src;
    },
  },
  styles: {
    src: `${directory.src}/styles/main.scss`,
    dest: `${directory.dest}/styles`,
    watch: [
      `${directory.src}/styles/**/*.scss`,
      `${directory.src}/components/**/*.scss`,
    ],
  },
  templates: {
    src: `${directory.src}/*.pug`,
    dest: `${directory.dest}`,
    watch: [
      `${directory.src}/*.pug`,
      `${directory.src}/templates/**/*.pug`,
      `${directory.src}/components/**/*.pug`,
    ],
  },
};

const imageminConfiguration = [
  imageminGifsicle({
    interlaced: true,
  }),
  imageminMozjpeg({
    quality: 80,
  }),
  imageminOptipng({
    optimizationLevel: 5,
  }),
  imageminSvgo({
    plugins: [
      {
        name: 'removeViewBox',
        active: false,
      },
    ],
  }),
  imageminWebp({
    quality: 80,
  }),
];

const isProductionMinimized = {
  styles: false,
  templates: false,
};

export {
  isDevelopment,
  directory,
  paths,
  imageminConfiguration,
  isProductionMinimized,
};
