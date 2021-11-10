const gulp = require('gulp')
const gulpIf = require('gulp-if')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const purgecss = require('gulp-purgecss')
const sourcemaps = require('gulp-sourcemaps')
const config = require('../config')

const buildStyles = () => {
    return gulp
        .src(`${config.paths.SRC_DIRS.styles}/*.{scss,sass}`)
        .pipe(plumber())
        .pipe(gulpIf(!config.isProduction, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss())
        .pipe(gulpIf(!config.isProduction, sourcemaps.write()))
        .pipe(
            gulpIf(
                !config.isProduction,
                gulp.dest(config.paths.DEST_DIRS.styles)
            )
        )
        .pipe(
            gulpIf(
                config.isProduction,
                gulp.dest(config.paths.BUILD_DIRS.styles)
            )
        )
}

const buildStyleFrameworks = () => {
    return gulp
        .src(`${config.paths.SRC_DIRS.styles}/frameworks/*.{scss,sass}`)
        .pipe(plumber())
        .pipe(gulpIf(!config.isProduction, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(
            gulpIf(
                config.isProduction,
                purgecss({
                    content: [
                        `${config.paths.SRC_DIRS.views}/**/*.pug`,
                        `${config.paths.DEST_DIRS.views}/*.html`,
                        `${config.paths.BUILD_DIRS.views}/*.html`
                    ]
                })
            )
        )
        .pipe(postcss())
        .pipe(gulpIf(!config.isProduction, sourcemaps.write()))
        .pipe(
            gulpIf(
                !config.isProduction,
                gulp.dest(config.paths.DEST_DIRS.styles)
            )
        )
        .pipe(
            gulpIf(
                config.isProduction,
                gulp.dest(config.paths.BUILD_DIRS.styles)
            )
        )
}

const watchStyles = () => {
    return gulp.watch(
        [
            `${config.paths.SRC_DIRS.styles}/**/*.{scss,sass}`,
            `!${config.paths.SRC_DIRS.styles}/frameworks/*.{scss,sass}`
        ],
        buildStyles
    )
}

const watchStyleFrameworks = () => {
    return gulp.watch(
        `${config.paths.SRC_DIRS.styles}/frameworks/*.{scss,sass}`,
        buildStyleFrameworks
    )
}

module.exports = {
    buildStyles,
    buildStyleFrameworks,
    watchStyles,
    watchStyleFrameworks
}
