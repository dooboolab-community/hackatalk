// eslint-disable-next-line @typescript-eslint/no-var-requires
const {defaults: tsjPreset} = require('ts-jest/presets');

module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    // ...tsjPreset.transform,
  },
  testMatch: ['**/tests/**/*.test.(ts|js)'],
  setupFilesAfterEnv: ['./tests/testSetup.ts'],
  testEnvironment: 'node',
};
