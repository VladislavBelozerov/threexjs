const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const baseWebpackConfig = require('./base.js')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    'babel-polyfill': 'babel-polyfill',
    test: './src/test/index.js',
  },
  devServer: {
    static: './src/test/static',
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'threexjs',
      template: './src/test/static/index.html',
    }),
  ],
  output: {
    path: path.resolve(__dirname, './src/test/static'),
    filename: '[name].bundle.js',
  },
})
