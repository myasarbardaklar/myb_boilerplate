const gulp = require('gulp');
const changed = require('gulp-changed');
const srcset = require('gulp-srcset').default;
const browserSync = require('browser-sync');
const { mode } = require('./config/server');
const paths = require('./config/paths');
const plugins = require('./config/plugins');
const { reloadBrowser } = require('./server');

const compileImages = function (cb) {
  return gulp
    .src(paths.images.compile.src)
    .pipe(changed(paths.images.compile.developmentDest))
    .pipe(
      srcset(
        plugins.images.srcset.IPluginRule,
        plugins.images.srcset.ICommonConfig
      )
    )
    .pipe(mode.development(gulp.dest(paths.images.compile.developmentDest)))
    .pipe(mode.production(gulp.dest(paths.images.compile.productionDest)))
    .pipe(browserSync.stream())
    .on('end', cb);
};

const watchImages = function () {
  return gulp.watch(
    paths.images.watch.src,
    gulp.series(compileImages, reloadBrowser)
  );
};

module.exports = { compileImages, watchImages };
