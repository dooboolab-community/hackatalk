import 'react-native';

import * as React from 'react';

import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Shared from '../SocialSignInButton';
import { render } from '@testing-library/react-native';

const props = createTestProps({
  svgIcon: jest.mock,
  clientId: jest.mock,
  clientSecret: jest.mock,
  socialProvider: jest.mock,
  onUserCreated: jest.fn(),
});

const component = createTestElement(<Shared {...props} />);

describe('Rendering', () => {
  it('renders without crashing', () => {
    const json = render(component).toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});
