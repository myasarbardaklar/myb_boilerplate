const gulp = require('gulp');
const plumber = require('gulp-plumber');
const { mode } = require('./config/server');
const paths = require('./config/paths');

const compileFonts = function () {
  return gulp
    .src(paths.fonts.compile.src)
    .pipe(plumber())
    .pipe(mode.development(gulp.dest(paths.fonts.compile.developmentDest)))
    .pipe(mode.production(gulp.dest(paths.fonts.compile.productionDest)));
};

const watchFonts = function () {
  return gulp.watch(paths.fonts.watch.src, compileFonts);
};

module.exports = { compileFonts, watchFonts };
