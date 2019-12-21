import 'react-native';

import * as React from 'react';

import { RenderResult, render } from '@testing-library/react-native';

import EmptyListItem from '../EmptyListItem';
import { createTestProps } from '../../../../test/testUtils';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('[EmptyListItem] render', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any;
  let component: React.ReactElement;
  let testingLib: RenderResult;
  beforeEach(() => {
    props = createTestProps();
    component = <EmptyListItem {...props} />;
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const { baseElement } = testingLib;
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
