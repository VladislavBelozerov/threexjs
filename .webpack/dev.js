const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const baseWebpackConfig = require('./base.js');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src/static',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'threexjs',
      template: './src/static/index.html',
    }),
  ],
  output: {
    path: path.resolve(__dirname, './src/static'),
    filename: '[name].bundle.js',
  },
});
