const gulp = require('gulp')
const gulpIf = require('gulp-if')
const plumber = require('gulp-plumber')
const config = require('../config')

const buildFonts = () => {
    return gulp
        .src(`${config.paths.SRC_DIRS.fonts}/**/*`)
        .pipe(plumber())
        .pipe(
            gulpIf(
                !config.isProduction,
                gulp.dest(config.paths.DEST_DIRS.fonts)
            )
        )
        .pipe(
            gulpIf(
                config.isProduction,
                gulp.dest(config.paths.BUILD_DIRS.fonts)
            )
        )
}

const watchFonts = () => {
    return gulp.watch(`${config.paths.SRC_DIRS.fonts}/**/*`, buildFonts)
}

module.exports = { buildFonts, watchFonts }
