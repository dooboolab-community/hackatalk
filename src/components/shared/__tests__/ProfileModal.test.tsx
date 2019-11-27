import 'react-native';

import * as React from 'react';

import { createTestElement, createTestProps } from '../../../../test/testUtils';

// Note: test renderer must be required after react-native.
import ProfileModal from '../ProfileModal';
import renderer from 'react-test-renderer';

let props: object;
let component: React.ReactElement;
// let testingLib: RenderResult;

describe('[ProfileModal] render', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<ProfileModal {...props} />);
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
