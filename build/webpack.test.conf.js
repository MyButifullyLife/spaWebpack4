var baseWebpackConfig = require('./webpack.base.conf')
var merge = require('webpack-merge')
var webpack = require('webpack')
var path = require('path')
let webpackConfig=  merge(baseWebpackConfig,{
    plugins: [
        // 设置全局变量
        new webpack.ProvidePlugin({
            '$envType': path.resolve(__dirname, '../config/test.js'),
        }),
        // new webpack.DefinePlugin({
        //     'process.env': config.dev.env
        // }),
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