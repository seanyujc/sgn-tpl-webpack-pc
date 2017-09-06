var merge = require('webpack-merge')
var path = require('path')
var baseWebpackConfig = require('./webpack.base.conf')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('./config')

var NODE_ENV = process.env.NODE_ENV || 'DEV'

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  cache: false,
  output: {
    publicPath: config.dev.assetsPublicPath
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../src', 'index-tpl.html'),
      basePath: config.dev.assetsPublicPath,
      dlls: ['dll/angular-dll', 'dll/plugins-dll'],
      styles: ['bootstrap']
    }),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(NODE_ENV),
      'PUBLIC_PATH': JSON.stringify(config.dev.assetsPublicPath)
    })
  ]
})
