const path = require('path')
module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb-typescript/base', 'plugin:prettier/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-console': 'off',
    'no-new': 'off',
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'prefer-default-export': 'off',
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '~': path.resolve('src'),
            },
            extensions: ['.tsx', '.ts', '.js', '.scss'],
          },
        },
      },
    },
  },
}
