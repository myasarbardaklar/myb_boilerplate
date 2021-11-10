const del = require('del')
const browserSync = require('browser-sync')
const config = require('../config')

const clean = async () => {
    return await del.sync([config.paths.DEST_DIR, config.paths.BUILD_DIR])
}

const developmentServer = (done) => {
    browserSync.create().init({
        server: { baseDir: config.paths.DEST_DIR },
        files: [
            {
                match: `${config.paths.DEST_DIRS.fonts}/**/*`,
                fn() {
                    this.reload()
                }
            },
            {
                match: `${config.paths.DEST_DIRS.images}/**/*`,
                fn() {
                    this.reload()
                }
            },
            `${config.paths.DEST_DIRS.styles}/*.css`,
            `${config.paths.DEST_DIRS.scripts}/*.js`,
            `${config.paths.DEST_DIRS.views}/*.html`
        ],
        port: 4747,
        open: false
    })

    done()
}

const productionServer = (done) => {
    browserSync.create().init({
        server: { baseDir: config.paths.BUILD_DIR },
        files: [
            {
                match: `${config.paths.BUILD_DIRS.fonts}/**/*`,
                fn() {
                    this.reload()
                }
            },
            {
                match: `${config.paths.BUILD_DIRS.images}/**/*`,
                fn() {
                    this.reload()
                }
            },
            `${config.paths.BUILD_DIRS.styles}/*.css`,
            `${config.paths.BUILD_DIRS.scripts}/*.js`,
            `${config.paths.BUILD_DIRS.views}/*.html`
        ],
        port: 3000,
        open: true
    })

    done()
}

module.exports = { clean, developmentServer, productionServer }
