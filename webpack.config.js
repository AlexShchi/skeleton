const options = require('./options.webpack.config');

const fs = require('fs'),
    webpack = require('webpack'),
    path = require('path'),
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
    TerserPlugin = require('terser-webpack-plugin'),
    ImageminWebpack = require('image-minimizer-webpack-plugin'),
    { extendDefaultPlugins } = require("svgo");
    CopyPlugin = require("copy-webpack-plugin");


const config = {
    target: 'node',
    stats: {
        all: false,
        builtAt: true,
        colors: true,
        errors: true,
        errorDetails: true,
        timings: true,
    },
    // watch: true,
    watchOptions:{
        poll: true,
        ignored: ['node_modules/'],
        // aggregateTimeout: 200,
    },
    mode: options.isDev ? 'development' : 'production',
    context: path.resolve(__dirname, 'frontend'),
    entry: {
        homepage: path.resolve(__dirname, 'frontend/scripts/homepage.js'),
        page: path.resolve(__dirname, 'frontend/scripts/page.js'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, options.isDev ? 'public/assets/build-dev' : 'public/assets/build'),
        publicPath: path.resolve(__dirname, options.isDev ? '/public/assets/build-dev' : '/public/assets/build')
    },
    resolve:{
        alias: {
            "images": path.resolve(__dirname,'frontend/images/')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery/dist/jquery.min.js",
            jQuery: "jquery/dist/jquery.min.js",
            "window.jQuery": "jquery/dist/jquery.min.js"
        }),
        new CleanWebpackPlugin({
            verbose: false,
            dangerouslyAllowCleanPatternsOutsideProject: true
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CopyPlugin({
            patterns: [
                { from: "./fonts", to: "../fonts" },
                { from: "./images", to: "../images" },
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.twig$/,
                use: ["twig-loader"],
            },
            {
                test: /\.html$/,
                type: 'asset/source'
            },
        ]
    },
    optimization: {
        runtimeChunk: false,
        minimize: options.isProd,
        minimizer: [
            new CssMinimizerPlugin({
                parallel: true,
                // sourceMap: options.isDev,
            }),
            new TerserPlugin(),
            new ImageminWebpack({
                minimizer: {
                    implementation: ImageminWebpack.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                                "svgo",
                                {
                                    plugins: extendDefaultPlugins([
                                        {
                                            name: "removeViewBox",
                                            active: false,
                                        },
                                        {
                                            name: "addAttributesToSVGElement",
                                            params: {
                                                attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                                            },
                                        },
                                    ]),
                                },
                            ],
                        ],
                    },
                },
            }),
        ]
    },

}

if (options.isProd) {
    console.log('isProd');
    config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
    });

    config.module.rules.push({
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader,
            {loader: 'css-loader', options: {sourceMap: options.isDev, url: false}},
            {loader: 'postcss-loader', options: {sourceMap: options.isDev}},
            {loader: 'sass-loader', options: {sourceMap: options.isDev}},
        ]
    });
    config.module.rules.push({
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            {loader: 'css-loader', options: {sourceMap: options.isDev, url: false}},
            {loader: 'postcss-loader', options: {sourceMap: options.isDev}}
        ]
    });

}

if(options.isDev){
    console.log('isDev');
    config.module.rules.push(
        {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {loader: 'css-loader', options: {sourceMap: options.isDev, url: false}},
                {loader: 'sass-loader', options: {sourceMap: options.isDev}},
            ]
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {loader: 'css-loader', options: {sourceMap: options.isDev, url: false}},
            ]
        }
    );
    config.entry.ui = path.resolve(__dirname, 'frontend/scripts/ui.js');
}


module.exports = config;
