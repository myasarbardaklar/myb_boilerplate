import gulp from 'gulp';
import gulpIf from 'gulp-if';
import webpack from 'webpack-stream';
import sourcemaps from 'gulp-sourcemaps';
import config from '../config';
import { SRC_PATHS, DEST_PATHS, BUILD_PATHS } from '../paths';

export const buildJavaScripts = () => {
    return gulp
        .src(`${SRC_PATHS.javascripts}/index.js`)
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
        .pipe(gulpIf(!config.isProduction, gulp.dest(DEST_PATHS.javascripts)))
        .pipe(gulpIf(config.isProduction, gulp.dest(BUILD_PATHS.javascripts)));
};

export const watchJavaScripts = () => {
    return gulp.watch(`${SRC_PATHS.javascripts}/**/*.js`, buildJavaScripts);
};
