import 'react-native';

import {createTestElement, createTestProps} from '../../../../test/testUtils';

import React from 'react';
import StackNavigator from '../RootStackNavigator';
import {render} from '@testing-library/react-native';

jest.mock('../../../components/pages/SignIn/SocialSignInButton', () => 'test');

const component = createTestElement(<StackNavigator {...createTestProps()} />);

describe('[Stack] navigator', () => {
  it('should renders without crashing', async () => {
    const json = render(component);

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});
