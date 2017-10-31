/*
 * @coder: 
 * @description: ddView 构建输入输出 by Webpack
 * @params: 
 * @return: 
*/
var path = require('path');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
module.exports = {
  entry: ['webpack-hot-middleware/client?reload=true','./src/js/app.js'],
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
        loader:  'babel-loader'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(png|jpe?g|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: 'img/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
  plugins: [
    // new ExtractTextPlugin('css/[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './view/index.html',
      inject: true
    })
  ]
};