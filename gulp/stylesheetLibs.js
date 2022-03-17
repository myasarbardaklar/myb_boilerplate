const gulp = require('gulp');
const plumber = require('gulp-plumber');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const hopeSass = require('@mr-hope/gulp-sass');
const postcss = require('gulp-postcss');
const purgecss = require('gulp-purgecss');
const sourcemaps = require('gulp-sourcemaps');
const csso = require('gulp-csso');
const cached = require('gulp-cached');
const dependents = require('gulp-dependents');
const debug = require('gulp-debug');
const browserSync = require('browser-sync');
const { mode } = require('./config/server');
const paths = require('./config/paths');
const plugins = require('./config/plugins');
const { reloadBrowser } = require('./server');

const sass = gulpSass(dartSass);

function compileStylesheetLibs() {
  return gulp
    .src(paths.stylesheetLibs.compile.src)
    .pipe(plumber())
    .pipe(mode.development(sourcemaps.init()))
    .pipe(sass.sync(plugins.stylesheetLibs.sass).on('error', sass.logError))
    .pipe(postcss())
    .pipe(mode.production(purgecss(plugins.stylesheetLibs.purgecss)))
    .pipe(mode.production(csso()))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(
      mode.development(gulp.dest(paths.stylesheetLibs.compile.developmentDest))
    )
    .pipe(
      mode.production(gulp.dest(paths.stylesheetLibs.compile.productionDest))
    )
    .pipe(browserSync.stream());
}

function watchStylesheetLibs() {
  return gulp.watch(
    paths.stylesheetLibs.watch.src,
    gulp.series(compileStylesheetLibs, reloadBrowser)
  );
}

module.exports = { compileStylesheetLibs, watchStylesheetLibs };
