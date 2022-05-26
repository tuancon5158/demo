module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    // 'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'plugin:jest/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  plugins: ['jest', 'prettier'],
  rules: {
    // vue rules
    'vue/v-on-event-hyphenation': 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'error',
    'vue/no-useless-template-attributes': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/no-computed-properties-in-data': 'off',
    'vue/no-reserved-props': 'off',
    'vue/no-deprecated-router-link-tag-prop': 'off',
    'vue/valid-v-memo': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'vue/require-explicit-emits': 'off',
    // 'prettier/prettier': 'error',
    camelcase: 'off',
    'no-undef': 'off', // ts(2304)
    'no-redeclare': 'off', // ts(2451)
    'no-console': 'off', // available console.log()
    'no-unused-vars': 'off',
    'first-attribute-linebreak': 'off',
    'array-callback-return': 'error',
    'dot-notation': 'error',
    'no-implicit-coercion': 'error',
    'no-lonely-if': 'error',
    'no-unneeded-ternary': 'error',
    eqeqeq: ['error', 'smart'],
    'no-else-return': [
      'error',
      {
        allowElseIf: false
      }
    ],
    'padding-line-between-statements': [
      'error',
      // Require blank lines after all directive prologues (e. g. 'use strict')
      {
        blankLine: 'always',
        prev: 'directive',
        next: '*'
      },
      // Disallow blank lines between all directive prologues (e. g. 'use strict')
      {
        blankLine: 'never',
        prev: 'directive',
        next: 'directive'
      },
      // Require blank lines after every sequence of variable declarations
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*'
      },
      // Blank lines could be between variable declarations
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      },
      // Require blank lines before all return statements
      {
        blankLine: 'always',
        prev: '*',
        next: 'return'
      },
      // Require blank lines before and after all following statements
      {
        blankLine: 'always',
        prev: '*',
        next: ['for', 'function', 'if', 'switch', 'try']
      },
      {
        blankLine: 'always',
        prev: ['for', 'function', 'if', 'switch', 'try'],
        next: '*'
      }
    ],
    'prefer-arrow-callback': 'error',
    'prefer-object-spread': 'error',
    'prefer-regex-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error'
  }
}
