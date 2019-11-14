import 'react-native';

import * as React from 'react';

import EmptyListItem from '../EmptyListItem';
import { createTestProps } from '../../../utils/testUtils';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let props: object;
let component: React.ReactElement;
// let testingLib: RenderResult;

describe('[EmptyListItem] render', () => {
  beforeEach(() => {
    props = createTestProps();
    component = <EmptyListItem {...props} />;
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
