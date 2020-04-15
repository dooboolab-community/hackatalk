module.exports = {
  root: true,
  extends: '@dooboo/eslint-config',
  rules: {
    'react/display-name': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    
  },
  overrides: [
    {
        files: ['*.ts', '*.tsx'],
        rules: {
            'no-dupe-class-members': 'off'
        }
    }
]
};
