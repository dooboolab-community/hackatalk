module.exports = {
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    jest: true,
  },
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 0,
    // '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    'no-console': 'error',
    'max-len': ['error', { code: 100 }],
    'comma-dangle': ['error', 'always-multiline'],
    semi: [2, 'always'],
    'arrow-parens': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'no-new-object': 'error',
    'no-array-constructor': 'error',
    'sort-imports': [
      2,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
  },
};
