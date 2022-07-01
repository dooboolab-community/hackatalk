module.exports = {
  root: true,
  extends: ['@dooboo/eslint-config', 'plugin:jest/recommended'],
  rules: {
    'eslint-comments/no-unlimited-disable': 0,
    'eslint-comments/no-unused-disable': 0,
    'jest/valid-expect-in-promise': 0,
  },
};
