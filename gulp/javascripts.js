const gulp = require('gulp');
const webpack = require('webpack-stream');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const { mode } = require('./config/server');
const paths = require('./config/paths');
const plugins = require('./config/plugins');
const { reloadBrowser } = require('./server');

const compileJavascripts = function (cb) {
  return gulp
    .src(paths.javascripts.compile.src)
    .pipe(webpack(plugins.javascripts.webpack))
    .pipe(mode.development(sourcemaps.init(plugins.javascripts.sourcemaps)))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(
      mode.development(gulp.dest(paths.javascripts.compile.developmentDest))
    )
    .pipe(mode.production(gulp.dest(paths.javascripts.compile.productionDest)))
    .pipe(browserSync.stream())
    .on('end', cb);
};

const watchJavascripts = function () {
  return gulp.watch(
    paths.javascripts.watch.src,
    gulp.series(compileJavascripts, reloadBrowser)
  );
};

module.exports = { compileJavascripts, watchJavascripts };
