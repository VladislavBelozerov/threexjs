const { merge } = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./base.js')

module.exports = [
  merge(baseWebpackConfig, {
    mode: 'production',
    entry: './src/modules/main/index.ts',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'threex.js',
      clean: true,
    },
    optimization: {
      minimize: false,
    },
  }),

  merge(baseWebpackConfig, {
    mode: 'production',
    entry: './src/modules/main/index.ts',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'threex.min.js',
    },
  }),
]
