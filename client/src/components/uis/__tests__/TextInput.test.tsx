import 'react-native';

import * as React from 'react';

import TextInput from '../TextInput';
import {createTestElement} from '../../../../test/testUtils';
import {render} from '@testing-library/react-native';

describe('[TextInput] render', () => {
  it('should renders without crashing', () => {
    const component = createTestElement(<TextInput />);
    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});
