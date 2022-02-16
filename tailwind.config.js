const { SRC_PATHS, DEST_PATHS, BUILD_PATHS } = require('./gulp/paths');

module.exports = {
    content: [
        `${SRC_PATHS.views}/**/*.pug`,
        `${DEST_PATHS.views}/*.html`,
        `${BUILD_PATHS.views}/*.html`
    ],
    theme: {
        extend: {}
    },
    plugins: [],
    prefix: 'tw-'
};
