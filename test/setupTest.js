import 'jest-styled-components';
import '@testing-library/jest-native/extend-expect';

jest.mock('../src/relay', () => {
  // eslint-disable-next-line
  const { createMockEnvironment } = require('relay-test-utils');
  const mockRelay = createMockEnvironment();
  mockRelay.init = jest.fn();
  return mockRelay;
});
