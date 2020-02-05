import 'react-native';

import * as React from 'react';

// Note: test renderer must be required after react-native.
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import TextInput from '../TextInput';
import { render } from '@testing-library/react-native';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;

describe('[TextInput] render', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<TextInput {...props} />);
  });

  it('should renders without crashing', () => {
    const { baseElement } = render(component);
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
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
