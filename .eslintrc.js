module.exports = {
  extends: [
    'airbnb-typescript/base',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-console': 'off',
    'no-new': 'off',
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { 'exceptAfterSingleLine': true },
    ],
    'prefer-default-export': 'off',
  }
};
