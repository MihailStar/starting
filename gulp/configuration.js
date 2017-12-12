const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const port = 3000;

const root = {
    input: 'src',
    output: 'dist'
};

const path = {
    input: {
        base64: `${root.input}/image/base64/**/*.*`,
        font: `${root.input}/font/**/*.*`,
        html: `${root.input}/*.html`,
        image: [
            `${root.input}/image/**/*.*`,
            `!${root.input}/image/base64/**/*.*`,
            `!${root.input}/image/sprite/**/*.*`
        ],
        script: {
            library: `${root.input}/script/library/**/*.js`,
            main: [
                `${root.input}/script/**/*.js`,
                `!${root.input}/script/library/**/*.js`
            ]
        },
        sprite: {
            raster: `${root.input}/image/sprite/*.png`,
            vector: `${root.input}/image/sprite/*.svg`
        },
        style: `${root.input}/style/main.scss`
    },
    output: {
        base64: `${root.output}/image/base64`,
        font: `${root.output}/font`,
        html: `${root.output}`,
        image: `${root.output}/image`,
        map: '.',
        script: {
            library: `${root.output}/script`,
            main: `${root.output}/script`
        },
        sprite: {
            raster: `${root.output}/image/sprite`,
            vector: `${root.input}/template`
        },
        style: `${root.output}/style`
    },
    watch: {
        base64: `${root.input}/image/base64/**/*.*`,
        font: `${root.input}/font/**/*.*`,
        html: `${root.input}/**/*.html`,
        image: [
            `${root.input}/image/**/*.*`,
            `!${root.input}/image/base64/**/*.*`,
            `!${root.input}/image/sprite/**/*.*`
        ],
        script: {
            library: `${root.input}/script/library/**/*.js`,
            main: [
                `${root.input}/script/**/*.js`,
                `!${root.input}/script/library/**/*.js`
            ]
        },
        sprite: {
            raster: `${root.input}/image/sprite/*.png`,
            vector: `${root.input}/image/sprite/*.svg`
        },
        style: `${root.input}/style/**/*.scss`
    }
};

module.exports.isDevelopment = isDevelopment;
module.exports.path = path;
module.exports.port = port;
module.exports.root = root;