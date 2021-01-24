const fs = require('fs'),
    path = require('path'),
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
    TerserPlugin = require('terser-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;


const myPath = {
    html: {
        entry: [path.resolve(__dirname, './frontend/html/pages')],
        resolve: path.resolve(__dirname, 'frontend/html/**/'),
    },
    dist: path.resolve(__dirname, './public'),
};

const config = {
    // stats: 'none',
    // watch: true,
    // watchOptions:{
    //     poll: true,
    //     ignored: ['node_modules/'],
    // },
    mode: isDev ? 'development' : 'production',
    context: path.resolve(__dirname, 'frontend'),
    entry: {
        homepage: path.resolve(__dirname, 'frontend/scripts/homepage.js'),
        page: path.resolve(__dirname, 'frontend/scripts/page.js'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, isDev ? 'public/assets/build-dev' : 'public/assets/build'),
        publicPath: path.resolve(__dirname, isDev ? '/assets/build-dev' : '/assets/build')
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: false,
            dangerouslyAllowCleanPatternsOutsideProject: true
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: isDev}},
                    {loader: 'postcss-loader', options: {sourceMap: isDev}},
                    {loader: 'sass-loader', options: {sourceMap: isDev}},

                ]
            },
            {
                test: /\.twig$/,
                use: ["twig-loader"],
            },
        ]
    },
    optimization: {
        runtimeChunk: false,
        minimize: isProd,
        minimizer: [
            new CssMinimizerPlugin({
                parallel: true,
                sourceMap: isDev,
            }),
            new TerserPlugin()
        ]
    },

}

if (isProd) {
    config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
    })
}
if (isDev) {
    config.plugins.push(
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {baseDir: [myPath.dist]},
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
    myPath.html.entry.forEach((item) => {
        results = results.concat(generateHtmlPlugins(item));
    });
    return results;
})();

config.plugins = config.plugins.concat(htmlPlugins);


// config.devServer = {
//     contentBase: path.resolve(__dirname + '/public/' ),
//     // open: 'Google Chrome',
//     publicPath: path.resolve(__dirname + '/public/'),
//     writeToDisk: true,
//     // compress: true,
//     port: 9000,
//     // index: './publick/text-page.html'
// }

module.exports = config;

//TODO: подключить сортировку медиазапросов,
// настроить watcher,