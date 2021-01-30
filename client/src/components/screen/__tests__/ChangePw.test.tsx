import * as React from 'react';

import {createTestElement, createTestProps} from '../../../../test/testUtils';

import ChangePw from '../ChangePw';
import {render} from '@testing-library/react-native';

const component = createTestElement(<ChangePw {...createTestProps()} />);

describe('[ChangePw] screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const json = render(component).toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});
