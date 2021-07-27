module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  overrides: {
    rules: {
      "eslintimport/prefer-default-export": "off"
    }
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript/base', 'prettier']
};
