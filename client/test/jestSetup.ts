import { GlobalWithFetchMock } from 'jest-fetch-mock';
// @ts-ignore
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

jest.mock('@react-navigation/core', () => {
  return {
    ...jest.requireActual('@react-navigation/core'),
    useNavigation: () => ({
      navigate: jest.fn(),
      setOptions: jest.fn(),
    }),
  };
});
