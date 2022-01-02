const config = require('./webpack.config.js');
const options = require('./options.webpack.config');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const fs = require('fs'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path');

if (options.isDev) {
    config.plugins.push(
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {baseDir: [options.myPath.dist]},
            open: false,
        })
    );
}

const generateHtmlPlugins = (templateDir) => {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles
        .filter((item) => item.split('.')[0][0] !== '_')
        .map((item) => {
            const parts = item.split('.');
            const name = parts[0];
            const extension = parts[1];
            return new HtmlWebpackPlugin({
                filename: `../../${name}.html`,
                template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
                inject: false,
            });
        });
}

const htmlPlugins = (() => {
    let results = [];
    options.myPath.html.entry.forEach((item) => {
        results = results.concat(generateHtmlPlugins(item));
    });
    return results;
})();

config.plugins = config.plugins.concat(htmlPlugins);



module.exports = config;