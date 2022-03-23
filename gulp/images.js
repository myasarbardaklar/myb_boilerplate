const gulp = require('gulp');
const changed = require('gulp-changed');
const srcset = require('gulp-srcset').default;
const { mode } = require('./config/server');
const paths = require('./config/paths');

const compileImages = function () {
  return gulp
    .src(paths.images.compile.src)
    .pipe(changed(paths.images.compile.developmentDest))
    .pipe(
      srcset(
        [
          {
            match: '(min-width: 3000px)',
            width: [1920, 1280, 1024, 860, 540, 320],
            format: ['jpg', 'webp']
          }
        ],
        { skipOptimization: true }
      )
    )
    .pipe(mode.development(gulp.dest(paths.images.compile.developmentDest)))
    .pipe(mode.production(gulp.dest(paths.images.compile.productionDest)));
};

const watchImages = function () {
  return gulp.watch(paths.images.watch.src, compileImages);
};

module.exports = { compileImages, watchImages };
