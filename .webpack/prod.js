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
      module: true,
      libraryTarget: 'module',
    },
    optimization: {
      minimize: false,
    },
    experiments: {
      outputModule: true,
    },
  }),

  merge(baseWebpackConfig, {
    mode: 'production',
    entry: './src/modules/main/index.ts',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'threex.min.js',
      module: true,
      libraryTarget: 'module',
    },
    experiments: {
      outputModule: true,
    },
  }),
]
