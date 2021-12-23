require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

jest.mock('react-native-reanimated', () => {
  const originalModule = jest.requireActual('react-native-reanimated');

  return {
    ...originalModule,
    createAnimatedComponent: jest.fn().mockReturnValue('mocked-view'),
  };
});
