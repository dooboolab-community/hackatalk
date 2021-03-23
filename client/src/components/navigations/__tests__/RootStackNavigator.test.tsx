import 'react-native';

import React from 'react';
import RootStackNavigator from '../RootStackNavigator';
import {createTestElement} from '../../../../test/testUtils';
import {render} from '@testing-library/react-native';

jest.mock('../../../components/pages/SignIn/SocialSignInButton', () => 'test');

describe('[Stack] navigator', () => {
  it('should renders without crashing', async () => {
    const component = createTestElement(<RootStackNavigator />);

    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});
