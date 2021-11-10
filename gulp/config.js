const mode = require('gulp-mode')()
const paths = require('./paths')

exports.paths = paths
exports.isProduction = mode.production()
