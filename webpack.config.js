/*
 * @coder:
 * @description: miniView 构建输入输出 by Webpack
*/
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
module.exports = {
  entry: ['webpack-hot-middleware/client?reload=true','./src/app.js'],
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
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
};
