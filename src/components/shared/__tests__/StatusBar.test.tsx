import 'react-native';

import * as React from 'react';

import { createTestElement, createTestProps } from '../../../../test/testUtils';

import StatusBar from '../StatusBar';
import { render } from '@testing-library/react-native';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;
// let testingLib: RenderResult;

describe('[StatusBar] render', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<StatusBar {...props} />);
  });

  it('renders without crashing', () => {
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
