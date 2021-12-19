import {cleanup} from '@testing-library/react-native';

// Cleanup after each case.
afterEach(cleanup);

// Use fake system time.
// Required for consistent snapshot testing.
/**
 * TODO: `jest-expo` version 40 depends on `jest` version 25.
 * `jest.setSystemTime` function is added in `jest` version 26.
 * When `jest-expo` updates its dependency to `jest@26`,
 * change `Date.now = jest.fn()` to a `jest.setSystemTime` call.
 */

jest.mock('../src/relay', () => {
  // eslint-disable-next-line
  const {createMockEnvironment} = require('relay-test-utils');
  const mockRelay = createMockEnvironment();

  return mockRelay;
});

process.on('unhandledRejection', (err) => {
  fail(err);
});
