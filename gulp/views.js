const gulp = require('gulp');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const posthtml = require('gulp-posthtml');
const ext_replace = require('gulp-ext-replace');
const data = require('gulp-data');
const gulpif = require('gulp-if');
const { setup } = require('@zoxon/emitty');
const { mode } = require('./config/server');
const paths = require('./config/paths');
const { compileStylesheets } = require('./stylesheets');

const emittySetup = setup;
const emittyPug = emittySetup(paths.SRC_PATHS.views, 'pug', {
  makeVinylFile: true
});

global.watch = false;
global.emittyChangedFile = {
  path: '',
  stats: null
};

function compileViews() {
  return gulp
    .src(paths.views.compile.src)
    .pipe(plumber())
    .pipe(
      gulpif(
        global.watch,
        emittyPug.stream(
          global.emittyChangedFile.path,
          global.emittyChangedFile.stats
        )
      )
    )
    .pipe(
      data(function (file) {
        return require(paths.views.compile.data(file.path));
      })
    )
    .pipe(pug({ pretty: true }))
    .pipe(posthtml())
    .pipe(ext_replace('.html', '.page.html'))
    .pipe(mode.development(gulp.dest(paths.views.compile.developmentDest)))
    .pipe(mode.production(gulp.dest(paths.views.compile.productionDest)));
}

function watchViews() {
  global.watch = true;

  return gulp
    .watch(
      paths.views.watch.src,
      gulp.parallel(compileStylesheets, compileViews)
    )
    .on('all', (event, filepath, stats) => {
      global.emittyChangedFile = {
        path: filepath,
        stats
      };
    });
}

module.exports = { compileViews, watchViews };
