
module.exports = {
    plugins: {
        'postcss-preset-env': {
            browsers: 'last 15 versions',
        },
        'postcss-sort-media-queries' : {
            sort: 'mobile-first'
        }
    }
}