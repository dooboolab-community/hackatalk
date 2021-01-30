// eslint-disable-next-line
const path = require('path');

const fbtEnumPath = path.join(
  __dirname,
  'src/utils/i18n/fbt/.enum_manifest.json',
);

module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    'macros',
    ['relay', {artifactDirectory: './src/__generated__'}],
    ['babel-plugin-styled-components'],
    ['module:react-native-dotenv'],
    [
      'babel-plugin-fbt',
      {
        fbtEnumPath,
        extraOptions: {__self: true},
      },
    ],
    'babel-plugin-fbt-runtime',
  ],
};
