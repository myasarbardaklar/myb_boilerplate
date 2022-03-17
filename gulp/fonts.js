const gulp = require('gulp');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const { mode } = require('./config/server');
const paths = require('./config/paths');
const { reloadBrowser } = require('./server');

const compileFonts = function (cb) {
  return gulp
    .src(paths.fonts.compile.src)
    .pipe(plumber())
    .pipe(mode.development(gulp.dest(paths.fonts.compile.developmentDest)))
    .pipe(mode.production(gulp.dest(paths.fonts.compile.productionDest)))
    .pipe(browserSync.stream())
    .on('end', cb);
};

const watchFonts = function () {
  return gulp.watch(
    paths.fonts.watch.src,
    gulp.series(compileFonts, reloadBrowser)
  );
};

module.exports = { compileFonts, watchFonts };
