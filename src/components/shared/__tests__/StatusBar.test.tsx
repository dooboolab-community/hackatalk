import 'react-native';

import * as React from 'react';

import { createTestElement, createTestProps } from '../../../utils/testUtils';

import { StateProvider } from '../../../contexts';
import StatusBar from '../StatusBar';
import { ThemeProvider } from 'styled-components/native';
import { ThemeType } from '../../../types';
import { createTheme } from '../../../theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let props: any;
let component: React.ReactElement;
// let testingLib: RenderResult;

describe('[StatusBar] render', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<StatusBar {...props} />);
  });

  it('renders without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON | null = renderer
      .create(component)
      .toJSON();
    expect(rendered).toMatchSnapshot();
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
