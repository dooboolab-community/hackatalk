module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      ['relay', { artifactDirectory: './src/__generated__' }],
      'react-native-reanimated/plugin',
      'macros',
      'inline-dotenv',
      ['babel-plugin-styled-components'],
    ],
  };
};
