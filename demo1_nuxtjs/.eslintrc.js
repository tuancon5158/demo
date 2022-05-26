module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    camelcase: 'off',
    'no-undef': 'off',
    'no-redeclare': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'no-empty-pattern': 'off',
    'nuxt/no-this-in-fetch-data': 'off',

    'array-callback-return': 'error',
    'dot-notation': 'error',
    eqeqeq: ['error', 'smart'],
    'no-else-return': [
      'error',
      {
        allowElseIf: false,
      },
    ],
    'no-implicit-coercion': 'error',
    'no-lonely-if': 'error',
    'no-unneeded-ternary': 'error',
    'padding-line-between-statements': [
      'error',
      // Require blank lines after all directive prologues (e. g. 'use strict')
      {
        blankLine: 'always',
        prev: 'directive',
        next: '*',
      },
      // Disallow blank lines between all directive prologues (e. g. 'use strict')
      {
        blankLine: 'never',
        prev: 'directive',
        next: 'directive',
      },
      // Require blank lines after every sequence of variable declarations
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*',
      },
      // Blank lines could be between variable declarations
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      // Require blank lines before all return statements
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      // Require blank lines before and after all following statements
      {
        blankLine: 'always',
        prev: '*',
        next: ['for', 'function', 'if', 'switch', 'try'],
      },
      {
        blankLine: 'always',
        prev: ['for', 'function', 'if', 'switch', 'try'],
        next: '*',
      },
    ],
    'prefer-arrow-callback': 'error',
    'prefer-object-spread': 'error',
    'prefer-regex-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
  },
}
