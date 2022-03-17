const gulp = require('gulp');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const posthtml = require('gulp-posthtml');
const ext_replace = require('gulp-ext-replace');
const browserSync = require('browser-sync');
const data = require('gulp-data');
const { mode } = require('./config/server');
const paths = require('./config/paths');
const plugins = require('./config/plugins');
const { compileStylesheetLibs } = require('./stylesheetLibs');
const { reloadBrowser } = require('./server');

function compileViews() {
  return gulp
    .src(paths.views.compile.src)
    .pipe(plumber())
    .pipe(
      data(function (file) {
        return require(paths.views.compile.data(file.path));
      })
    )
    .pipe(pug(plugins.views.pug))
    .pipe(posthtml())
    .pipe(ext_replace('.html', '.page.html'))
    .pipe(mode.development(gulp.dest(paths.views.compile.developmentDest)))
    .pipe(mode.production(gulp.dest(paths.views.compile.productionDest)))
    .pipe(browserSync.stream());
}

function watchViews() {
  return gulp.watch(
    paths.views.watch.src,
    gulp.series(compileStylesheetLibs, compileViews, reloadBrowser)
  );
}

module.exports = { compileViews, watchViews };
