/* eslint-disable @typescript-eslint/no-var-requires */
const expoPreset = require('jest-expo/jest-preset');
// const jestPreset = require('@testing-library/react-native/jest-preset');
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = {
  preset: '@testing-library/react-native',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'svg', 'png'],
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsConfig: {
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
    ...jestPreset.setupFiles,
    '<rootDir>/test/jestSetup.js',
    '<rootDir>/test/jestSetup.ts',
  ],
  setupFilesAfterEnv: [
    './test/setupTest.js',
  ],
  /* eslint-disable */
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules-*|sentry-expo|native-base|dooboo-ui|@dooboo-ui)',
  ],
  /* eslint-enable */
  collectCoverageFrom: [
    'src/**/*.tsx',
    '!src/App.tsx',
    '!<rootDir>/**/tablet.tsx',
  ],
};
