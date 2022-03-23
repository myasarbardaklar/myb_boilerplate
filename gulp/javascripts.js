const gulp = require('gulp');
const webpack = require('webpack-stream');
const sourcemaps = require('gulp-sourcemaps');
const { mode } = require('./config/server');
const paths = require('./config/paths');

const compileJavascripts = function () {
  return gulp
    .src(paths.javascripts.compile.src)
    .pipe(
      webpack({
        mode: mode.production() ? 'production' : 'development',
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
    .pipe(mode.development(sourcemaps.init({ loadMaps: true })))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(
      mode.development(gulp.dest(paths.javascripts.compile.developmentDest))
    )
    .pipe(mode.production(gulp.dest(paths.javascripts.compile.productionDest)));
};

const watchJavascripts = function () {
  return gulp.watch(paths.javascripts.watch.src, compileJavascripts);
};

module.exports = { compileJavascripts, watchJavascripts };
