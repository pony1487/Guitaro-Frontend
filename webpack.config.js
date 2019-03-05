var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/js/index.js',
        topics: './src/js/topics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
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
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'src/index.html',
        //     chunks:['index']
        // }),
        // // new HtmlWebpackPlugin({
        // //     filename: 'account.html',
        // //     template: 'account.html',
        // //     chunks:[]
        // // }),
        // new HtmlWebpackPlugin({
        //     filename: 'topics.html',
        //     template: 'src/topics.html',
        //     chunks:['topics']
        // }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     JQuery: 'jquery'
        // }),
        // new CleanWebpackPlugin()
    ]
};