import { GlobalWithFetchMock } from 'jest-fetch-mock';
// @ts-ignore
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock & typeof globalThis;

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

jest.mock('react-native-reanimated', () => {
  const Reanimated = jest.requireActual('react-native-reanimated');

  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('expo-constants', () => ({
  appOwnership: 'expo',
  manifest: {
    extra: {
      GRAPHQL_URL: process.env.GRAPHQL_URL,
      ROOT_URL: process.env.ROOT_URL,
      facebookAppId: process.env.facebookAppId,
      facebookSecret: process.env.facebookSecret,
      googleClientId: process.env.googleClientId,
      googleSecret: process.env.googleSecret,
    },
  },
}));

jest.mock('src/components/shared/SocialSignInButton', () => 'test');
