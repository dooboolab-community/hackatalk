import 'jest-styled-components';
import '@testing-library/jest-native/extend-expect';

jest.mock('../src/relay/RelayEnvironment', () => {
  // eslint-disable-next-line
  const { createMockEnvironment } = require('relay-test-utils');
  return createMockEnvironment();
});
