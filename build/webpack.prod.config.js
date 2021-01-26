var webpack = require('webpack')
var path = require('path')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config')
var outputDir = path.resolve(__dirname, '../dist')
//const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  output: {
    filename: 'project.[hash:10].min.js',
    path: outputDir,
  },
  //devtool: "eval-source-map",//是否启用source map文件：用于调试查看js源码，eval-source-map无map文件，可查看源码,cheap-module-source-map有map文件
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
   // new CleanWebpackPlugin()
  ]
})
