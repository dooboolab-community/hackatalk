import 'react-native';

import * as React from 'react';

import EmptyListItem from '../molecules/EmptyListItem';
import {createTestProps} from '../../../../test/testUtils';
import {render} from '@testing-library/react-native';

describe('[EmptyListItem] render', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any;
  let component: React.ReactElement;

  beforeEach(() => {
    props = createTestProps();
    component = <EmptyListItem {...props} />;
  });

  it('renders without crashing', () => {
    const json = render(component);

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
