const gulp = require('gulp');
const { mode } = require('./gulp/config/server');
const {
  cleanFiles,
  developmentServer,
  productionServer
} = require('./gulp/server');
const { compileFonts, watchFonts } = require('./gulp/fonts');
const { compileImages, watchImages } = require('./gulp/images');
const { compileViews, watchViews } = require('./gulp/views');
const { compileStylesheets, watchStylesheets } = require('./gulp/stylesheets');
const { compileJavascripts, watchJavascripts } = require('./gulp/javascripts');

// Initalize NODE_ENV environment variable
process.env.NODE_ENV = mode.production() ? 'production' : 'development';

const build = gulp.series(
  cleanFiles,
  gulp.parallel(
    compileFonts,
    compileImages,
    compileViews,
    compileStylesheets,
    compileJavascripts
  )
);

const dev = gulp.series(
  build,
  developmentServer,
  gulp.parallel(
    watchFonts,
    watchImages,
    watchViews,
    watchStylesheets,
    watchJavascripts
  )
);

const serve = productionServer;

module.exports = { build, dev, serve };
