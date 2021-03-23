import 'react-native';

import AuthStackNavigator from '../AuthStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createTestElement} from '../../../../test/testUtils';
import {render} from '@testing-library/react-native';

jest.mock('../../../components/pages/SignIn/SocialSignInButton', () => 'test');

describe('[Stack] navigator', () => {
  it('should renders without crashing', async () => {
    const component = createTestElement(
      <NavigationContainer>
        <AuthStackNavigator />
      </NavigationContainer>,
    );

    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});
