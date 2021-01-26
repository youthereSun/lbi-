var webpack = require('webpack')
var path = require('path')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var outputPath = path.resolve(__dirname, '../static/js')

module.exports = merge(baseWebpackConfig, {
  entry: './src/main.js',
  output: {
    publicPath: '/static/js/',
	  path: outputPath
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, '../index.html'),
        favicon: 'favicon.ico',
        inject: true
    })
  ],

    devServer: {
      publicPath: '/assets/',
      proxy: {
        '/api': {
          target: 'http://localhost:8199',  //本地测试接口域名
          changeOrigin: true,  //是否跨域
          pathRewrite: {
            '^/api': ''   //重写接口
          },

        }
      },
      host: '0.0.0.0',
      port: 8091, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
      autoOpenBrowser: true,
    }

})
