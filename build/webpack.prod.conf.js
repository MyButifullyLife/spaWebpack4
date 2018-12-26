var baseWebpackConfig = require('./webpack.base.conf')
var merge = require('webpack-merge')
var webpack = require('webpack')
var path = require('path')
const { resolve } = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var CompressionWebpackPlugin = require('compression-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
// var utils = require('./utils')
let webpackConfig = merge(baseWebpackConfig,{
    devtool:  false,
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: false,  // true 会保留未混淆代码之前的配置
        minimizer: [
            new OptimizeCssAssetsPlugin({}), // 压缩 css,使用minimizer会自动取消webpack的默认配置，所以记得用UglifyJsPlugin
            new UglifyJsPlugin({
                // 压缩 js
                uglifyOptions: {
                    ecma: 6,
                    cache: true,
                    parallel: true
                }
            })
        ]
    },
    // 配置打包输出相关
    output: {
        // 打包输出目录
        path: resolve(__dirname, '../dist'),

        // 入口 js 的打包输出文件名
        filename: 'js/[name].js',
        // chunkFilename: 'js/[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.styl(us)?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    'postcss-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        // 设置全局变量
        new webpack.ProvidePlugin({
            '$envType': path.resolve(__dirname, '../config/pro.js'),
        }),
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../')
        }),

        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
            canPrint: true
        }),
        new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(js|css|img)$' // 压缩 js 与 css
            ),
            threshold: 10240,
            minRatio: 0.8
        }),
        // new ExtractTextPlugin({
        //     filename: 'css/[name].[contenthash].css'
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