var baseWebpackConfig = require('./webpack.base.conf')
var merge = require('webpack-merge')
var webpack = require('webpack')
var path = require('path')
module.exports = merge(baseWebpackConfig,{
    plugins: [
        // 设置全局变量
        new webpack.ProvidePlugin({
            '$envType': path.resolve(__dirname, '../config/dev.js'),
        }),
        // new webpack.DefinePlugin({
        //     'process.env': config.dev.env
        // }),
    ]
})