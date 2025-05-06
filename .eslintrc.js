module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended', // Make sure this is last to override other configs
  ],
  env: {
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'warn', // Show Prettier issues as warnings
    // You can add or override rules here
    // e.g., '@typescript-eslint/no-explicit-any': 'off',
  },
  ignorePatterns: ['node_modules/', 'dist/', '.next/', 'out/', 'build/'],
};
