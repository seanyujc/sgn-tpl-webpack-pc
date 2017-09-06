var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    angular: ['angular', 'angular-i18n/angular-locale_zh-cn', 'angular-sanitize'],
    plugins: ['angular-animate', '@uirouter/angularjs', path.resolve(__dirname, 'src/lib/angular-ui-bootstrap'),
      path.resolve(__dirname, 'src/lib/angular-iscroll'), 'oclazyload'],
    styles: ['bootstrap-loader']
  },
  output: {
    path: path.resolve(__dirname, 'dll/'),
    filename: '[name]-dll.js',
    library: '[name]_lib'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.scss'],
    modules: [path.resolve(__dirname, 'node_modules')]
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'dll/[name]-manifest.json'),
      name: '[name]_lib'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'angular',
      minChunks: 2
    }),
    new ExtractTextPlugin('bootstrap.css')
  ],
  module: {
    rules: [
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     loader: 'style!css!sass?outputStyle=expanded&includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      //   })
      // },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader?name=assets/fonts/[name].[ext]'
          }
        ]
      }
    ]
  }
}
