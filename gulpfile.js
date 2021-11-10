const gulp = require('gulp')
const {
    clean,
    developmentServer,
    productionServer
} = require('./gulp/tasks/serve')
const { buildFonts, watchFonts } = require('./gulp/tasks/fonts')
const { buildImages, watchImages } = require('./gulp/tasks/images')
const { buildViews, watchViews } = require('./gulp/tasks/views')
const {
    buildStyles,
    buildStyleFrameworks,
    watchStyles,
    watchStyleFrameworks
} = require('./gulp/tasks/styles')
const { buildScripts, watchScripts } = require('./gulp/tasks/scripts')

exports.build = gulp.series(
    clean,
    gulp.series(
        buildFonts,
        buildImages,
        buildViews,
        buildStyles,
        buildStyleFrameworks,
        buildScripts
    )
)

exports.dev = gulp.series(
    this.build,
    developmentServer,
    gulp.parallel(
        watchFonts,
        watchImages,
        watchViews,
        watchStyles,
        watchStyleFrameworks,
        watchScripts
    )
)

exports.serve = gulp.series(productionServer)
