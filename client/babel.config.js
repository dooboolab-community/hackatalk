// eslint-disable-next-line
const path = require('path');

module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      ['relay', { artifactDirectory: './src/__generated__' }],
      'macros',
      'inline-dotenv',
      ['babel-plugin-styled-components'],
      'babel-plugin-fbt-runtime', ['babel-plugin-fbt', {
        fbtEnumPath: path.join(__dirname, '.enum_manifest.json'),
        extraOptions: { __self: true },
      }],
    ],
  };
};
