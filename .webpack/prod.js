const { merge } = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./base.js')

const modules = [
  {
    name: 'threex',
    entry: './src/modules/main/index.ts',
    outputPath: '../dist',
  },
  {
    name: 'assetManager',
    entry: './src/modules/assetManager/index.ts',
    outputPath: '../dist/utils',
  },
]

module.exports = modules.reduce((acc, item, index) => {
  acc.push(
    merge(baseWebpackConfig, {
      mode: 'production',
      entry: item.entry,
      output: {
        path: path.resolve(__dirname, item.outputPath),
        filename: `${item.name}.js`,
        module: true,
        libraryTarget: 'module',
      },
      optimization: {
        minimize: false,
      },
      experiments: {
        outputModule: true,
      },
    })
  )

  acc.push(
    merge(baseWebpackConfig, {
      mode: 'production',
      entry: item.entry,
      output: {
        path: path.resolve(__dirname, item.outputPath),
        filename: `${item.name}.min.js`,
        module: true,
        libraryTarget: 'module',
      },
      experiments: {
        outputModule: true,
      },
    })
  )

  return acc
}, [])
