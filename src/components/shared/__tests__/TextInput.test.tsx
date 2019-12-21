import 'react-native';

import * as React from 'react';

// Note: test renderer must be required after react-native.
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import TextInput from '../TextInput';
import renderer from 'react-test-renderer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;
// let testingLib: RenderResult;

describe('[TextInput] render', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<TextInput {...props} />);
  });

  it('renders without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON | null = renderer
      .create(component)
      .toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
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
