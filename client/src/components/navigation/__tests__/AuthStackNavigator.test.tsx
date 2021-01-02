import 'react-native';

import { AllProviders } from '../../../providers';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigator from '../AuthStackNavigator';
import { render } from '@testing-library/react-native';

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
