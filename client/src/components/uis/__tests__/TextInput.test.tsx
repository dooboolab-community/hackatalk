import 'react-native';

import * as React from 'react';

// Note: test renderer must be required after react-native.
import {createTestElement, createTestProps} from '../../../../test/testUtils';

import TextInput from '../TextInput';
import {render} from '@testing-library/react-native';

const component = createTestElement(<TextInput {...createTestProps()} />);

describe('[TextInput] render', () => {
  it('should renders without crashing', () => {
    const json = render(component).toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });

  // describe('interactions', () => {
  //   beforeEach(() => {
  //     testingLib = render(component);
  //   });

  //   it('should simulate onPress', () => {
  //     const btn = testingLib.queryByTestId('btn');
  //     act(() => {
  //       fireEvent.press(btn);
  //     });
  //     expect(cnt).toBe(3);
  //   });
  // });
});
