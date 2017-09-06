const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('./config')

var NODE_ENV = process.env.NODE_ENV || 'PRO'

module.exports = merge(baseWebpackConfig, {
  output: {
    publicPath: config.build.assetsPublicPath
  },
  cache: true,
  devtool: 'nosources-source-map',
  plugins: [
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../src', 'index-tpl.html'),
      basePath: config.build.assetsPublicPath,
      dlls: ['dll/angular-dll', 'dll/plugins-dll'],
      styles: ['bootstrap']
    }),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(NODE_ENV),
      'PUBLIC_PATH': JSON.stringify(config.build.assetsPublicPath)
    })
  ]
})
