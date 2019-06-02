const path = require('path');
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin');

function resolvePath (value) {
    return path.join(__dirname, '..', value);
};


const baseWebpackConfig = {
    entry: {
        app: './src/app.jsx'
    },
    output: {
        filename: '[name].js',
        path:  `${path.join(__dirname, '..', '/dist')}`,
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@': resolvePath('src'),
            '@components': resolvePath('src/components'),
            '@assets': resolvePath('src/assets'),
            '@helper': resolvePath('src/helper'),
            '@api': resolvePath('src/api'),
            '@pages': resolvePath('src/pages'),
            '@config': resolvePath('src/config')
        },
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                loader: 'babel-loader',
                include: [`${path.join(__dirname, '..', '/src')}`]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024 * 20
                },
                include: [`${path.join(__dirname, '..', '/src')}`]
            },
        ]
    },
    plugins: [
        new InjectManifest({
            swSrc: './src/sw.js',
            swDest: 'sw.js'
        })
    ]
};

module.exports = baseWebpackConfig;
