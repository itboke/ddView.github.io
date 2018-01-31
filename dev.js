const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const express = require('express')
const config = require('./config')
const compiler = webpack(webpackConfig)
const app = express()

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: false
})
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb();
  })
})
app.use(devMiddleware)
app.use(hotMiddleware)
app.listen(config.port, () => {
  console.log('服务运行在: http://localhost:' + config.port)
});
