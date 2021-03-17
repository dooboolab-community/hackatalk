import {GlobalWithFetchMock} from 'jest-fetch-mock';
import {initFbt} from '../src/utils/fbt';
// @ts-ignore
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock &
  // eslint-disable-next-line no-undef
  typeof globalThis;

customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

// Mock react-native-reanimated because it depends on native modules
// which is not available inside testing environment.
jest.mock('react-native-reanimated', () =>
  jest.requireActual('react-native-reanimated/mock'),
);

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('expo-constants', () => ({
  appOwnership: 'expo',
}));

jest.mock('react-native-scalable-image', () => 'test');

// Mock dooboo-ui because it is causing cyclic reference issue that
// breaks jest snapshot serializer.
jest.mock('dooboo-ui', () => {
  const DoobooUI = jest.requireActual('dooboo-ui');
  const React = jest.requireActual('react');
  const ReactNative = jest.requireActual('react-native');

  DoobooUI.Button = jest.fn().mockImplementation(() => 'dooboo-ui-button');

  const ret = {
    ...DoobooUI,
    get Button() {
      return jest
        .fn()
        .mockImplementation((props) =>
          React.createElement(ReactNative.TouchableOpacity, props),
        );
    },
  };

  return ret;
});

initFbt();
