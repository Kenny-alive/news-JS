// const path = require('path');
// const { merge } = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const DotenvWebpackPlugin = require('dotenv-webpack');
// const webpack = require('webpack');



// const baseConfig = {
//     entry: path.resolve(__dirname, './src/index.ts'),
//     mode: 'development',
//     module: {
//         rules: [
//             {
//                 test: /\.css$/i,
//                 use: ['style-loader', 'css-loader'],
//             },
//             {
//                 test: /\.ts$/,
//                 use: 'ts-loader',
//                 exclude: /node_modules/,
//             },
//         ],
//     },
//     resolve: {
//         extensions: ['.ts', '.js', '.css'],
//     },

//     output: {
//         filename: 'index.js',
//         path: path.resolve(__dirname, './dist'),
//     },
//     plugins: [
//         new DotenvWebpackPlugin(),
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, './src/index.html'),
//             filename: 'index.html',
//         }),
//         new CleanWebpackPlugin(),
//         new webpack.DefinePlugin({
//             'process.env.API_URL': JSON.stringify(process.env.API_URL),
//             'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
//         }),
//     ],
// };

// module.exports = ({ mode }) => {
//     const isProductionMode = mode === 'prod';
//     const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

//     return merge(baseConfig, envConfig);
// };

const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = {
    entry: {
        index: path.resolve(__dirname, './src/index.ts'),
        app: path.resolve(__dirname, './src/components/app/app.ts'),
        apploader: path.resolve(__dirname, './src/components/controller/appLoader.ts'),
        controller: path.resolve(__dirname, './src/components/controller/controller.ts'),
        loader: path.resolve(__dirname, './src/components/controller/loader.ts'),
        news: path.resolve(__dirname, './src/components/view/news/news.ts'),
        sources: path.resolve(__dirname, './src/components/view/sources/sources.ts'),
        appview: path.resolve(__dirname, './src/components/view/appView.ts'),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.css', '.png', '.jpg', '.jpeg', '.gif'],
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: (pathData) => {
            switch (pathData.chunk.name) {
                case 'index':
                    return 'index.js';
                case 'app':
                    return 'components/app/app.js';
                case 'apploader':
                    return 'components/controller/appLoader.js';
                case 'controller':
                    return 'components/controller/controller.js';
                case 'loader':
                    return 'components/controller/loader.js';
                case 'news':
                    return 'components/view/news/news.js';
                case 'sources':
                    return 'components/view/sources/sources.js';
                case 'appview':
                    return 'components/view/appView.js';
                default:
                    return '[name].js';
            }
        },
    },
    plugins: [
        new DotenvWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/global.css'), to: path.resolve(__dirname, 'dist/global.css') },
                { from: path.resolve(__dirname, 'src/components/img'), to: path.resolve(__dirname, 'dist/components/img') },
                // { from: path.resolve(__dirname, 'src/components/app/app.ts'), to: path.resolve(__dirname, 'dist/components/app/app.js') },
                { from: path.resolve(__dirname, 'src/components/view/news/news.css'), to: path.resolve(__dirname, 'dist/components/view/news/[name][ext]') },
                { from: path.resolve(__dirname, 'src/components/view/sources/sources.css'), to: path.resolve(__dirname, 'dist/components/view/sources/[name][ext]') },
                // { from: path.resolve(__dirname, 'src/index.html'), to: path.resolve(__dirname, 'dist/index.html') },
                // { from: path.resolve(__dirname, 'src/components/img/**/*'), to: path.resolve(__dirname, 'dist/img/[name][ext]') },
            ],
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
