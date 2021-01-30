const webpack = require('webpack');

module.exports = {
  babel: {
    alias: {
      '^react-native$': 'react-native-web',
    },
    presets: [
      'babel-preset-expo',
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
          fbtEnumManifest: require('./src/utils/i18n/fbt/.enum_manifest.json'),
          extraOptions: {__self: true},
        },
      ],
      '@babel/plugin-syntax-class-properties',
      'babel-plugin-fbt-runtime'
    ],
  },
  webpack: {
    __DEV__: true,
    resolve: {
      alias: {
        'react-native$': 'react-native-web'
      },
    },
    plugins: [
      new webpack.DefinePlugin({ __DEV__: true }),
    ]
  },
};
