module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      'macros',
      'inline-dotenv',
      'react-native-reanimated/plugin',
      ['relay', { artifactDirectory: './src/__generated__' }],
      ["transform-inline-environment-variables", {
        "include": [
          "NODE_ENV"
        ]
      }],
      ['babel-plugin-styled-components'],
    ],
  };
};
