const expoPreset = require('jest-expo/jest-preset');

process.env.TZ = 'Asia/Seoul';

module.exports = {
  automock: false,
  preset: 'jest-expo',
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'svg', 'png'],
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsConfig: {
        jsx: 'react',
        allowJs: true,
      },
      diagnostics: false,
    },
  },
  modulePathIgnorePatterns: [
    '<rootDir>/server/',
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/.history/',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'babel-jest',
  },
  setupFiles: [
    ...expoPreset.setupFiles,
    '<rootDir>/test/jestSetup.js',
    '<rootDir>/test/jestSetup.ts',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  cacheDirectory: '.jest/cache',
  setupFilesAfterEnv: ['./test/setupTest.ts'],
  haste: {
    defaultPlatform: 'ios',
    platforms: ['android', 'ios', 'native'],
  },
  /* eslint-disable */
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native/|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules-*|sentry-expo|native-base|dooboo-ui|@dooboo-ui|@sentry/.*|sentry-expo|@react-native-async-storage)',
  ],
  /* eslint-enable */
  collectCoverageFrom: [
    'src/**/*.tsx',
    '!src/App.tsx',
    '!<rootDir>/**/tablet.tsx',
  ],
};
