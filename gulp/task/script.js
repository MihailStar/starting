const concat = require('gulp-concat');
const configuration = require('../configuration');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const webpackStream = require('webpack-stream');

gulp.task('script:library', () => {
    return gulp
        .src(configuration.path.input.script.library)
        .pipe(concat('library.min.js'))
        .pipe(gulpIf(!configuration.isDevelopment, uglify()))
        .pipe(gulp.dest(configuration.path.output.script.library));
});

gulp.task('script:main', () => {
    return gulp
        .src(configuration.path.input.script.main)
        .pipe(gulpIf(configuration.isDevelopment,
            webpackStream({
                devtool: 'cheap-eval-source-map',
                mode: 'development',
                output: {
                    filename: 'main.min.js'
                }
            }),
            webpackStream({
                mode: 'production',
                module: {
                    rules: [
                        {
                            exclude: /node_modules/,
                            test: /\.js$/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    presets: ['@babel/preset-env']
                                }
                            }
                        }
                    ]
                },
                output: {
                    filename: 'main.min.js'
                }
            })
        ))
        .pipe(gulp.dest(configuration.path.output.script.main));
});