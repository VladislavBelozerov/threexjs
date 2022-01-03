const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'ts', 'tsx']
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
    alias: {
      '~': path.resolve(__dirname, '../src'),
    },
  },
}
