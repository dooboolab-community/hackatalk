import 'react-native';

import * as React from 'react';

import CheckBox from '../CheckBox';
import {createTestElement} from '../../../../test/testUtils';
import {render} from '@testing-library/react-native';

describe('Rendering', () => {
  it('renders without crashing', () => {
    const component = createTestElement(<CheckBox />);
    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
  });
});
