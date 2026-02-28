module.exports = {
  root: true,
  env: { node: true, es2022: true, browser: true },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['dist/', 'coverage/', 'node_modules/'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
