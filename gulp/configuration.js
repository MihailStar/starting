const directory = {
    input: 'src',
    output: 'dist'
};

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const path = {
    input: {
        data: `./${directory.input}/data/data.json`,
        font: `./${directory.input}/font/**/*.*`,
        html: `./${directory.input}/*.html`,
        image: {
            base64: `./${directory.input}/image/base64/**/*.*`,
            main: [
                `./${directory.input}/image/**/*.*`,
                `!./${directory.input}/image/base64/**/*.*`,
                `!./${directory.input}/image/sprite/**/*.*`
            ],
            sprite: {
                raster: `./${directory.input}/image/sprite/**/*.png`,
                vector: `./${directory.input}/image/sprite/**/*.svg`
            }
        },
        script: {
            library: `./${directory.input}/script/library/**/*.js`,
            main: [
                `./${directory.input}/script/**/*.js`,
                `!./${directory.input}/script/library/**/*.js`
            ]
        },
        style: `./${directory.input}/style/main.scss`
    },
    output: {
        font: `./${directory.output}/font`,
        html: `./${directory.output}`,
        image: {
            base64: `./${directory.output}/image/base64`,
            main: `./${directory.output}/image`,
            sprite: {
                raster: `./${directory.output}/image/sprite`,
                vector: `./${directory.input}/template`
            },
        },
        script: {
            library: `./${directory.output}/script`,
            main: `./${directory.output}/script`
        },
        style: `./${directory.output}/style`
    },
    watch: {
        data: `./${directory.input}/data/data.json`,
        font: `./${directory.input}/font/**/*.*`,
        html: `./${directory.input}/**/*.html`,
        image: {
            base64: `./${directory.input}/image/base64/**/*.*`,
            main: [
                `./${directory.input}/image/**/*.*`,
                `!./${directory.input}/image/base64/**/*.*`,
                `!./${directory.input}/image/sprite/**/*.*`
            ],
            sprite: {
                raster: `./${directory.input}/image/sprite/**/*.png`,
                vector: `./${directory.input}/image/sprite/**/*.svg`
            }
        },
        script: {
            library: `./${directory.input}/script/library/**/*.js`,
            main: [
                `./${directory.input}/script/**/*.js`,
                `!./${directory.input}/script/library/**/*.js`
            ]
        },
        style: `./${directory.input}/style/**/*.scss`
    }
};

const port = 3000;

module.exports.directory = directory;
module.exports.isDevelopment = isDevelopment;
module.exports.path = path;
module.exports.port = port;