import 'react-native';

import * as React from 'react';

import NotFound from '../NotFound';
import {createTestElement} from '../../../../test/testUtils';
import {render} from '@testing-library/react-native';

describe('[NotFound] screen', () => {
  it('renders without crashing', () => {
    const component = createTestElement(<NotFound />);
    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});
