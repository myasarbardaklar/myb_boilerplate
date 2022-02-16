module.exports = {
    plugins: {
        'posthtml-inline-svg': {
            cwd: 'src/icons',
            tag: 'icon',
            attr: 'src'
        },
        'posthtml-beautify': {
            rules: {
                indent: 4,
                blankLines: false
            }
        }
    }
};
