const gulp = require('gulp');
const plumber = require('gulp-plumber');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const postcss = require('gulp-postcss');
const purgecss = require('gulp-purgecss');
const sourcemaps = require('gulp-sourcemaps');
const csso = require('gulp-csso');
const browserSync = require('browser-sync');
const { mode } = require('./config/server');
const paths = require('./config/paths');
const plugins = require('./config/plugins');
const { reloadBrowser } = require('./server');

const sass = gulpSass(dartSass);

const compileStylesheets = function (cb) {
  return gulp
    .src(paths.stylesheets.compile.src)
    .pipe(plumber())
    .pipe(mode.development(sourcemaps.init()))
    .pipe(sass.sync(plugins.stylesheets.sass).on('error', sass.logError))
    .pipe(postcss())
    .pipe(mode.production(purgecss(plugins.stylesheets.purgecss)))
    .pipe(mode.production(csso()))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(
      mode.development(gulp.dest(paths.stylesheets.compile.developmentDest))
    )
    .pipe(mode.production(gulp.dest(paths.stylesheets.compile.productionDest)))
    .pipe(browserSync.stream())
    .on('end', cb);
};

const watchStylesheets = function () {
  return gulp.watch(
    paths.stylesheets.watch.src,
    gulp.series(compileStylesheets, reloadBrowser)
  );
};

module.exports = { compileStylesheets, watchStylesheets };
