const opn = require('opn')
const express = require('express')
const app = express()
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./config')

const port = config.dev.port
const autoOpenBrowser = !!config.dev.autoOpenBrowser
const webpackConfig = require('./webpack.dev.conf')
const compiler = webpack(webpackConfig)

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: '/',
  quiet: true
})
const hotMiddleware = webpackHotMiddleware(compiler, {
  log: () => {}
})
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
app.use(require('connect-history-api-fallback')())
app.use(devMiddleware)
app.use(hotMiddleware)
app.use(express.static('./dist'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  if (autoOpenBrowser) {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
