const path = require('path');
const baseWebpackConfig = require('./webpack.base');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: 'none',
    module: {
        rules: [
            {
                test: /\.pcss/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,  // importLoaders: 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                            sourceMap: true
                        }
                    },
                    { loader: 'postcss-loader' }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'app.css'
        }),
        new HTMLPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: path.resolve(__dirname, '../assets/favicon.ico'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunks: ['app', '//react.js'],
            chunksSortMode: 'dependency'
        })
    ],
    // externals: {
    //     "react": 'window.React',
    //     "react-dom": 'window.ReactDOM'
    // }
});
