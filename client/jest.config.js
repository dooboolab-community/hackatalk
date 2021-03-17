/* eslint-disable @typescript-eslint/no-var-requires */
const expoPreset = require('jest-expo/jest-preset');
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'svg', 'png', 'json'],
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsconfig: {
        jsx: 'react',
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
    '<rootDir>/test/jestSetup.ts',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  setupFilesAfterEnv: [
    './test/setupTest.js',
  ],
  /* eslint-disable */
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?(@react-native|react-native)|react-clone-referenced-element|@react-native-community|@unimodules|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules-*|sentry-expo|native-base|dooboo-ui|@dooboo-ui|@sentry/.*|sentry-expo)',
  ],
  /* eslint-enable */
  collectCoverageFrom: [
    'src/**/*.tsx',
    '!src/App.tsx',
    '!<rootDir>/**/tablet.tsx',
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
};
