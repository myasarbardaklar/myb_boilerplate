const gulp = require('gulp');
const plumber = require('gulp-plumber');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const postcss = require('gulp-postcss');
const purgecss = require('gulp-purgecss');
const sourcemaps = require('gulp-sourcemaps');
const csso = require('gulp-csso');
const cached = require('gulp-cached');
const dependents = require('gulp-dependents');
const browserSync = require('browser-sync');
const { mode } = require('./config/server');
const paths = require('./config/paths');

const sass = gulpSass(dartSass);

const compileStylesheets = function () {
  return gulp
    .src(paths.stylesheets.compile.src)
    .pipe(plumber())
    .pipe(mode.development(sourcemaps.init()))
    .pipe(
      sass
        .sync({
          indentWidth: 2,
          includePaths: ['./node_modules']
        })
        .on('error', sass.logError)
    )
    .pipe(postcss())
    .pipe(
      mode.production(
        purgecss({
          content: [
            `${paths.SRC_PATHS.views}/**/*.pug`,
            `${paths.DEST_PATHS.views}/*.html`,
            `${paths.BUILD_PATHS.views}/*.html`
          ]
        })
      )
    )
    .pipe(mode.production(csso()))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(
      mode.development(gulp.dest(paths.stylesheets.compile.developmentDest))
    )
    .pipe(mode.production(gulp.dest(paths.stylesheets.compile.productionDest)))
    .pipe(browserSync.stream({ match: '**/*.css' }));
};

const watchStylesheets = function () {
  return gulp.watch(paths.stylesheets.watch.src, compileStylesheets);
};

module.exports = { compileStylesheets, watchStylesheets };
