const path = require('path');
const options = {
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV !== 'development',
    myPath: {
        html: {
            entry: [path.resolve(__dirname, './frontend/html/pages')],
            resolve: path.resolve(__dirname, 'frontend/html/**/'),
        },
        dist: path.resolve(__dirname, './public/'),
    }
}
module.exports = options;