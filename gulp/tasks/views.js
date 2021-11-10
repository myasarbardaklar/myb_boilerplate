const gulp = require('gulp')
const gulpIf = require('gulp-if')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const posthtml = require('gulp-posthtml')
const ext_replace = require('gulp-ext-replace')
const config = require('../config')

const buildViews = () => {
    return gulp
        .src(`${config.paths.SRC_DIRS.views}/pages/*.page.pug`)
        .pipe(plumber())
        .pipe(pug({ pretty: false }))
        .pipe(posthtml())
        .pipe(ext_replace('.html', '.page.html'))
        .pipe(
            gulpIf(
                !config.isProduction,
                gulp.dest(config.paths.DEST_DIRS.views)
            )
        )
        .pipe(
            gulpIf(
                config.isProduction,
                gulp.dest(config.paths.BUILD_DIRS.views)
            )
        )
}

const watchViews = () => {
    return gulp.watch(`${config.paths.SRC_DIRS.views}/**/*.pug`, buildViews)
}

module.exports = { buildViews, watchViews }
