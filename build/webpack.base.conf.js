const path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HappyPack = require('happypack')

module.exports = {
  entry: {
    app: './src/app/index.bootstrap'
  },
  output: {
    filename: 'js/[name]_[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, '../node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              useCache: true
            }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: 'source-map-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'url-loader?name=assets/images/[name]_[hash].[ext]&limit=500'
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            'happypack/loader?id=scss'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: require(path.resolve(__dirname, '../dll/angular-manifest.json'))
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: require(path.resolve(__dirname, '../dll/plugins-manifest.json'))
    }),
    new ExtractTextPlugin('assets/css/styles.css'),
    new HappyPack({
      id: 'scss',
      threads: 4,
      loaders: [
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    })
  ]
}
