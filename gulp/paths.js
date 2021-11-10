const SRC_DIR = './src'
const DEST_DIR = './dist'
const BUILD_DIR = './build'

const SRC_DIRS = {
    fonts: `${SRC_DIR}/fonts`,
    images: `${SRC_DIR}/images`,
    icons: `${SRC_DIR}/icons`,
    styles: `${SRC_DIR}/scss`,
    javascripts: `${SRC_DIR}/js`,
    views: `${SRC_DIR}/views`
}

const DEST_DIRS = {
    fonts: `${DEST_DIR}/fonts`,
    images: `${DEST_DIR}/images`,
    styles: `${DEST_DIR}/css`,
    javascripts: `${DEST_DIR}/js`,
    views: DEST_DIR
}

const BUILD_DIRS = {
    fonts: `${BUILD_DIR}/fonts`,
    images: `${BUILD_DIR}/images`,
    styles: `${BUILD_DIR}/css`,
    javascripts: `${BUILD_DIR}/js`,
    views: BUILD_DIR
}

module.exports = {
    SRC_DIR,
    DEST_DIR,
    BUILD_DIR,
    SRC_DIRS,
    DEST_DIRS,
    BUILD_DIRS
}
