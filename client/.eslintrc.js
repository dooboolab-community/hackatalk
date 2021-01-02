module.exports = {
  extends: '@react-native-community',
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: 'detect',
    },
  },
  env: {
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    'react-native/no-inline-styles': 0,
    camelcase: 0,
    indent: 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [1],
    'no-use-before-define': [0],
    '@typescript-eslint/no-use-before-define': [1],
    'jsx-quotes': ['error', 'prefer-double'],
    '@typescript-eslint/interface-name-prefix': 0,
    'no-console': 'warn',
    'react/jsx-uses-vars': [2],
    curly: ['error', 'multi-line'],
    'max-len': [
      'error',
      {
        code: 140,
        ignoreRegExpLiterals: true,
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    semi: [2, 'always'],
    'arrow-parens': ['error', 'always'],
    'no-new-object': 'error',
    'no-array-constructor': 'error',
    'no-use-before-define': [0],
    '@typescript-eslint/no-use-before-define': [1],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'react/prop-types': 0,
    'generator-star-spacing': ['error', {before: false, after: true}],
    'react/display-name': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    'padding-line-between-statements': [
      'warn',
      {blankLine: 'always', prev: '*', next: 'return'},
      // Always require blank lines after directive (like 'use-strict'), except between directives
      {blankLine: 'always', prev: 'directive', next: '*'},
      {blankLine: 'any', prev: 'directive', next: 'directive'},
      // Always require blank lines after import, except between imports
      {blankLine: 'always', prev: 'import', next: '*'},
      {blankLine: 'any', prev: 'import', next: 'import'},
      // Always require blank lines before and after every sequence of variable declarations and export
      {
        blankLine: 'always',
        prev: '*',
        next: ['const', 'let', 'var', 'export'],
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var', 'export'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var', 'export'],
        next: ['const', 'let', 'var', 'export'],
      },
      {
        blankLine: 'always',
        prev: ['multiline-const', 'multiline-expression', 'multiline-let'],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['multiline-const', 'multiline-expression', 'multiline-let'],
      },
      // Always require blank lines before and after class declaration, if, do/while, switch, try
      {
        blankLine: 'always',
        prev: '*',
        next: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'],
      },
      {
        blankLine: 'always',
        prev: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'],
        next: '*',
      },
    ],
    '@typescript-eslint/no-empty-function': 0,
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
  },
};

// module.exports = {
//   root: true,
//   extends: '@dooboo/eslint-config',
//   rules: {
//     'no-unused-vars': 'off',
//     '@typescript-eslint/no-unused-vars': 0,
//     '@typescript-eslint/ban-ts-comment': 0,
//     'default-param-last': ['warn'],
//     'eslint-comments/no-unlimited-disable': 0,
//     'eslint-comments/no-unused-disable': 0,
//   },
// };
