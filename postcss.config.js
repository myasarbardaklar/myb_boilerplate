module.exports = {
    syntax: 'postcss-scss',
    plugins: {
        'postcss-font-magician': {
            variants: {
                Oswald: {
                    '300 italic': [],
                    '400 italic': [],
                    '500 italic': [],
                    '600 italic': [],
                    '700 italic': [],
                    '800 italic': [],
                    '900 italic': []
                }
            },
            hosted: ['./fonts']
        },
        tailwindcss: {},
        autoprefixer: {},
        'postcss-property-lookup': {},
        'postcss-short': {
            skip: 'null'
        },
        cssnano: {},
        'postcss-sort-media-queries': {}
    }
};
