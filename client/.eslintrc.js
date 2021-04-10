const path = require('path');

module.exports = {
  root: true,
  extends: [
    '@dooboo/eslint-config',
    'plugin:i18n-json/recommended',
  ],
  rules: {
    'eslint-comments/no-unlimited-disable': 0,
    'eslint-comments/no-unused-disable': 0,
  },
};
