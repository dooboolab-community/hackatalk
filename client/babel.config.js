module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-react',
        {runtime: 'automatic', importSource: '@emotion/react'},
      ],
      'babel-preset-expo', '@babel/preset-typescript'
    ],
    plugins: [
      ['relay', { artifactDirectory: './src/__generated__' }],
      'react-native-reanimated/plugin',
      'macros',
      'inline-dotenv',
    ],
  };
};
