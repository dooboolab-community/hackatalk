import 'react-native';

import { AllProviders } from '../../../providers';
import { AuthProvider } from '../../../providers/AuthProvider';
import { ThemeProvider as DoobooThemeProvider } from '@dooboo-ui/theme';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import StackNavigator from '../AuthStackNavigator';
import { createMockEnvironment } from 'relay-test-utils';
import {
  render,
} from '@testing-library/react-native';

const component = (
  <AllProviders>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  </AllProviders>
);

describe('[Stack] navigator', () => {
  it('should renders without crashing', async () => {
    const json = render(component).toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});
