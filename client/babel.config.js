module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-typescript',
    ],
    sourceMaps: 'inline',
    plugins: [
      ['relay', { artifactDirectory: './src/__generated__' }],
      [
        '@babel/plugin-transform-runtime',
        {
          helpers: true,
          regenerator: false,
        },
      ],
      '@babel/proposal-object-rest-spread',
      ['babel-plugin-styled-components'],
    ],
  };
};
