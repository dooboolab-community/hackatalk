import * as Device from 'expo-device';

import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import React, {Suspense} from 'react';
import {dark, light} from '../src/theme';

import {AuthProvider} from '../src/providers/AuthProvider';
import {DeviceProvider} from '../src/providers/DeviceProvider';
import {DoobooProvider} from 'dooboo-ui';
import type {IEnvironment} from 'relay-runtime';
import type {MockEnvironment} from 'relay-test-utils';
import {ProfileModalProvider} from '../src/providers/ProfileModalProvider';
import type {ReactElement} from 'react';
import {RelayEnvironmentProvider} from 'react-relay';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import type {StackNavigationProp} from '@react-navigation/stack';
import {Text} from 'react-native';
import type {ThemeType} from 'dooboo-ui';
import type {User} from '../src/types/graphql';
import {act} from '@testing-library/react-native';

export const TestSafeAreaProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  return (
    <SafeAreaProvider
      initialMetrics={{
        frame: {x: 0, y: 0, width: 0, height: 0},
        insets: {top: 0, left: 0, right: 0, bottom: 0},
      }}
    >
      {children}
    </SafeAreaProvider>
  );
};

type MockContext = {
  themeType?: ThemeType;
  deviceType?: Device.DeviceType;
  user?: User;
  environment?: IEnvironment;
};

/**
 * Wrap an React element with predefined context values
 * for easy testing.
 * @param child Element to be wrapped.
 * @param mockContext Mock context values.
 * @returns Wrapped element.
 */
export const createTestElement = (
  child: ReactElement,
  mockContext?: MockContext,
): ReactElement => {
  jest.spyOn(Device, 'getDeviceTypeAsync').mockImplementation(async () => {
    if (mockContext?.deviceType) {
      return mockContext.deviceType;
    }

    return Device.DeviceType.PHONE;
  });

  return (
    <DeviceProvider>
      <DoobooProvider
        themeConfig={{
          customTheme: {light, dark},
          initialThemeType: mockContext?.themeType ?? 'dark',
        }}
      >
        <RelayEnvironmentProvider
          environment={mockContext?.environment ?? createMockEnvironment()}
        >
          <Suspense fallback={<Text>TEST FALLBACK</Text>}>
            <AuthProvider initialAuthUser={mockContext?.user}>
              <ProfileModalProvider>
                <TestSafeAreaProvider>{child}</TestSafeAreaProvider>
              </ProfileModalProvider>
            </AuthProvider>
          </Suspense>
        </RelayEnvironmentProvider>
      </DoobooProvider>
    </DeviceProvider>
  );
};

type NavigationStub<T extends {}> = {
  [K in keyof StackNavigationProp<T>]: jest.Mock;
};

/**
 * Create a navigation stub which can be used to mock `useNavigation` hook.
 * Each method can be overridden for each test cases.
 * @example
 * const mockNavigation = createMockNavigation();
 * const mockRoute = {}; // Provide your own route params here.
 * mockNavigation.setParams.mockImplementation(() => {
 *   // Your implementation can go here.
 * });
 * jest.mock('@react-navigation/core', () => ({
 *   ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
 *   useNavigation: () => mockNavigation,
 *   useRoute: () => mockRoute,
 * }));
 * @returns the generated navigation stub.
 */
export function createMockNavigation(): NavigationStub<{}> {
  return {
    getId: jest.fn(),
    getParent: jest.fn(),
    getState: jest.fn(),
    addListener: jest.fn(),
    canGoBack: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
    isFocused: jest.fn(),
    navigate: jest.fn(),
    removeListener: jest.fn(),
    reset: jest.fn(),
    setOptions: jest.fn(),
    setParams: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  };
}

/**
 * Resolve all pending operations in `mockEnvironment`.
 *
 * Sometimes it is not possible to know how many GraphQL requests should be handled
 * before rendering a component.
 * Therefore, use this function after render function
 * instead of calling `queueOperationResolver` multiple times before render.
 *
 * @param mockEnvironment Pending operations are retrieved from this environment.
 * @param resolver Resolver object for operation resolution.
 */
export function resolveAllOperations(
  mockEnvironment: MockEnvironment,
  resolver: MockPayloadGenerator.MockResolvers,
): void {
  for (const op of mockEnvironment.mock.getAllOperations()) {
    act(() => {
      mockEnvironment.mock.resolve(
        op,
        MockPayloadGenerator.generate(op, resolver),
      );
    });
  }
}
