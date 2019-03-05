var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'test.html',
            template: './test.html',
            chunks:[]
        }),
        new HtmlWebpackPlugin({
            filename: 'account.html',
            template: 'account.html',
            chunks:[]
        }),
        new HtmlWebpackPlugin({
            filename: 'topics.html',
            template: 'topics.html',
            chunks:[]
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            JQuery: 'jquery'
        }),
    ]
};