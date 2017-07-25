const root = {
    input: 'src',
    output: 'dist'
};

const clean = root.output;

const input = {
    font: `${root.input}/font/**/*.*`,
    html: `${root.input}/*.html`,
    image: [
        `${root.input}/image/**/*.*`,
        `!${root.input}/image/sprite/**/*.*`
    ],
    script: {
        lib: `${root.input}/script/lib/**/*.js`,
        main: [
            `${root.input}/script/**/*.js`,
            `!${root.input}/script/lib/**/*.js`
        ]
    },
    sprite: {
        raster: `${root.input}/image/sprite/*.png`,
        vector: `${root.input}/image/sprite/*.svg`
    },
    style: `${root.input}/style/main.scss`
};

const output = {
    font: `${root.output}/font`,
    html: `${root.output}`,
    image: `${root.output}/image`,
    map: '.',
    script: {
        lib: `${root.output}/script`,
        main: `${root.output}/script`
    },
    sprite: {
        raster: `${root.output}/image/sprite`,
        vector: `${root.input}/template`
    },
    style: `${root.output}/style`
};

const watch = {
    font: `${root.input}/font/**/*.*`,
    html: `${root.input}/**/*.html`,
    image: [
        `${root.input}/image/**/*.*`,
        `!${root.input}/image/sprite/**/*.*`
    ],
    script: {
        lib: `${root.input}/script/lib/**/*.js`,
        main: [
            `${root.input}/script/**/*.js`,
            `!${root.input}/script/lib/**/*.js`
        ]
    },
    sprite: {
        raster: `${root.input}/image/sprite/*.png`,
        vector: `${root.input}/image/sprite/*.svg`
    },
    style: `${root.input}/style/**/*.scss`
};

module.exports.root = root;
module.exports.clean = clean;
module.exports.input = input;
module.exports.output = output;
module.exports.watch = watch;