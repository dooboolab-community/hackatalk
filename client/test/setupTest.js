import 'jest-styled-components';
import '@testing-library/jest-native/extend-expect';

import { cleanup } from '@testing-library/react-native';

// Cleanup after each case.
afterEach(cleanup);

jest.mock('../src/relay', () => {
  // eslint-disable-next-line
  const { createMockEnvironment } = require('relay-test-utils');
  const mockRelay = createMockEnvironment();

  return mockRelay;
});

process.on('unhandledRejection', (err) => {
  fail(err);
});
