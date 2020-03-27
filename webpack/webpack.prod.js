const path = require('path');
const baseWebpackConfig = require('./webpack.base');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const prodWebpackConfig = merge(baseWebpackConfig, {
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
            chunks: ['app', 'vendors']
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'vendors'
        },
        // runtimeChunk: {
        //     name: 'runtime'
        // }
    },
    externals: {
        "react": 'window.React',
        "react-dom": 'window.ReactDOM'
    }
});

if (process.env.npm_lifecycle_event === 'analyze') {
    prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = prodWebpackConfig;
