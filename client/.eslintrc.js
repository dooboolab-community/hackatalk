module.exports = {
  root: true,
  extends: '@dooboo/eslint-config',
  rules: {
    'react/display-name': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    camelcase: 0,
    'default-param-last': ['warn'],
  },
};
