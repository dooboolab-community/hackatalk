/* eslint-disable @typescript-eslint/no-var-requires */
const expoPreset = require('jest-expo/jest-preset');
const jestPreset = require('@testing-library/react-native/jest-preset');
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = Object.assign(expoPreset, jestPreset, {
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
      tsConfig: {
        jsx: 'react',
      },
      diagnostics: false,
    },
  },
  modulePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/.history/',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'babel-jest',
  },
  setupFiles: [...expoPreset.setupFiles, ...jestPreset.setupFiles, '<rootDir>/test/jestSetup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|react-navigation|dooboo-native-widgets)/',
  ],
  setupFilesAfterEnv: ['./test/setupTest.js'],
});
