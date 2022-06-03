require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

jest.mock('react-native-reanimated', () => {
  const originalModule = jest.requireActual('react-native-reanimated');

  return {
    ...originalModule,
    createAnimatedComponent: jest.fn().mockReturnValue('mocked-view'),
  };
});


jest.mock('@react-navigation/stack', () => ({
  // @ts-ignore
  ...jest.requireActual('@react-navigation/stack'),
  useHeaderHeight: () => 12,
}));

global.__reanimatedWorkletInit = jest.fn();

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
