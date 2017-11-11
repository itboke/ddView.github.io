/*
 * @coder:
 * @description: miniView 构建输入输出 by Webpack
*/
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractLESS = new ExtractTextPlugin('css/[name].css');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var webpack = require('webpack');
module.exports = {
  entry: {
    index: './src/js/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader:  'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[hash:8].[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': 'production'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    extractLESS,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './view/index.html',
      inject: true
    })
  ]
};
