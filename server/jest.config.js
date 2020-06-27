// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: false,
    },
    fetch: require('node-fetch'),
  },
  preset: 'ts-jest',
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    ...tsjPreset.transform,
  },
  testMatch: [
    '**/tests/**/*.test.(ts|js)',
  ],
  setupFilesAfterEnv: ['./tests/setup/testSetup.ts'],
  testEnvironment: 'node',
};
