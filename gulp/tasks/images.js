const gulp = require('gulp')
const gulpIf = require('gulp-if')
const changed = require('gulp-changed')
const image = require('gulp-image')
const config = require('../config')

const buildImages = () => {
    return gulp
        .src(`${config.paths.SRC_DIRS.images}/**/*`)
        .pipe(changed(config.paths.DEST_DIRS.images))
        .pipe(image())
        .pipe(
            gulpIf(
                !config.isProduction,
                gulp.dest(config.paths.DEST_DIRS.images)
            )
        )
        .pipe(
            gulpIf(
                config.isProduction,
                gulp.dest(config.paths.BUILD_DIRS.images)
            )
        )
}

const watchImages = () => {
    return gulp.watch(`${config.paths.SRC_DIRS.images}/**/*`, buildImages)
}

module.exports = { buildImages, watchImages }
