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

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'),
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
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.css'],
    },

    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        // Загрузить переменные окружения из .env
        new DotenvWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        // Убираем DefinePlugin, чтобы избежать конфликта
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
