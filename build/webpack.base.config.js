var path = require('path')
var utils = require('./utils')
var srcRoot = path.resolve(__dirname, '../src')
var outputPath = path.resolve(__dirname, '../static/js')

module.exports = {
  entry: './src/index.js',
  output: {
    path: outputPath,
    filename: 'bundle.js'
  },
  externals: {
    'AMap': 'AMap',
  },
  resolve:  {
    root: srcRoot,
    extensions: ['', '.js', '.vue'],
	alias: {
		'src': path.resolve(__dirname, '../src'),
		'assets': path.resolve(__dirname, '../src/assets'),
		'components': path.resolve(__dirname, '../src/components'),
		'vue': 'vue/dist/vue.js'
	}
  },
  module: {
    preLoaders: [
 /*     {
        test: /\.vue$/,
        loader: 'eslint?parser=babel-eslint',
        include: srcRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint?parser=babel-eslint',
        include: srcRoot,
        exclude: /node_modules/
      }*/
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: srcRoot,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue',
        inlcude: srcRoot,
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less?sourceMap'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      }
    ]
  }
}
