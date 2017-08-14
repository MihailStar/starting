const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const port = 3000;

const root = {
    input: 'src',
    output: 'dist'
};

const path = {
    input: {
        font: `${root.input}/font/**/*.*`,
        html: `${root.input}/*.html`,
        image: [
            `${root.input}/image/**/*.*`,
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
        font: `${root.input}/font/**/*.*`,
        html: `${root.input}/**/*.html`,
        image: [
            `${root.input}/image/**/*.*`,
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

exports.isDevelopment = isDevelopment;
exports.path = path;
exports.port = port;
exports.root = root;