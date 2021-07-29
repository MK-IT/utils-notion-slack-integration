module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json']
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'import/prefer-default-export': 'off'
  },
  overrides: [
    {
      files: ['*.js, *.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json']
      }
    }
  ],
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript/base', 'prettier']
};
