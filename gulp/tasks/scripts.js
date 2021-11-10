const gulp = require('gulp')
const gulpIf = require('gulp-if')
const webpack = require('webpack-stream')
const sourcemaps = require('gulp-sourcemaps')
const config = require('../config')

const buildScripts = () => {
    return gulp
        .src(`${config.paths.SRC_DIRS.javascripts}/index.js`)
        .pipe(
            webpack({
                mode: config.isProduction ? 'production' : 'development',
                module: {
                    rules: [
                        {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    presets: ['@babel/preset-env']
                                }
                            }
                        }
                    ]
                }
            })
        )
        .pipe(gulpIf(!config.isProduction, sourcemaps.init({ loadMaps: true })))
        .pipe(gulpIf(!config.isProduction, sourcemaps.write()))
        .pipe(
            gulpIf(
                !config.isProduction,
                gulp.dest(config.paths.DEST_DIRS.javascripts)
            )
        )
        .pipe(
            gulpIf(
                config.isProduction,
                gulp.dest(config.paths.BUILD_DIRS.javascripts)
            )
        )
}

const watchScripts = () => {
    return gulp.watch(
        `${config.paths.SRC_DIRS.javascripts}/**/*.js`,
        buildScripts
    )
}

module.exports = { buildScripts, watchScripts }
