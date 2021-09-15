const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: {
      import: './src/main/index.ts',
    },
    assetsManager: {
      import: './src/plugins/assetsManager/index.ts',
    },
  },
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
      extensions: ['js', 'ts', 'tsx'],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      Main: path.resolve(__dirname, 'src/main/'),
      AssetsManager: path.resolve(__dirname, 'src/plugins/assetsManager/'),
      Test: path.resolve(__dirname, 'src/test/'),
    },
  },
};
