import imagemin from 'gulp-imagemin';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const directory = {
  src: 'src',
  dest: 'dist'
};

const paths = {
  fonts: {
    src: `./${directory.src}/fonts/**/*.{eot,svg,ttf,woff,woff2}`,
    dest: `./${directory.dest}/fonts`,
    get watch() {
      return this.src;
    }
  },
  images: {
    src: [
      `./${directory.src}/images/**/*.{gif,jpg,png,svg,webp}`,
      `!./${directory.src}/images/base64/**/*.{gif,jpg,png,svg,webp}`,
      `!./${directory.src}/images/sprite/**/*.svg`
    ],
    dest: `./${directory.dest}/images`,
    get watch() {
      return this.src;
    }
  },
  imageToBase64: {
    src: `./${directory.src}/images/base64/**/*.{gif,jpg,png,svg,webp}`,
    dest: `./${directory.dest}/images/base64`,
    get watch() {
      return this.src;
    }
  },
  scriptLibraries: {
    src: `./${directory.src}/scripts/libraries/**/*.js`,
    dest: `./${directory.dest}/scripts`,
    get watch() {
      return this.src;
    }
  },
  scripts: {
    src: `./${directory.src}/scripts/main.js`,
    dest: `./${directory.dest}/scripts`,
    watch: [
      `./${directory.src}/scripts/**/*.js`,
      `!./${directory.src}/scripts/libraries/**/*.js`
    ]
  },
  styles: {
    src: `./${directory.src}/styles/main.{sass,scss}`,
    dest: `./${directory.dest}/styles`,
    watch: `./${directory.src}/styles/**/*.{sass,scss}`
  },
  templates: {
    src: `./${directory.src}/*.pug`,
    dest: `./${directory.dest}`,
    watch: `./${directory.src}/**/*.pug`
  },
  sprite: {
    src: `./${directory.src}/images/sprite/**/*.svg`,
    dest: `./${directory.dest}/images/sprite`,
    get watch() {
      return this.src;
    }
  }
};

const imageminConfig = {
  imagemin: [
    imagemin.gifsicle({
      interlaced: true
    }),
    imagemin.jpegtran({
      progressive: true
    }),
    imagemin.optipng({
      optimizationLevel: 5
    }),
    imagemin.svgo({
      plugins: [{
          cleanupIDs: false
        },
        {
          removeViewBox: false
        }
      ]
    })
  ]
};

export {isDevelopment, directory, paths, imageminConfig};