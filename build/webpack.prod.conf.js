var baseWebpackConfig = require('./webpack.base.conf')
var merge = require('webpack-merge')
var webpack = require('webpack')
var path = require('path')
// var utils = require('./utils')
let webpackConfig = merge(baseWebpackConfig,{
    devtool:  false,
    plugins: [
        // 设置全局变量
        new webpack.ProvidePlugin({
            '$envType': path.resolve(__dirname, '../config/pro.js'),
        }),

    ]
})


webpack(webpackConfig, function (err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

})