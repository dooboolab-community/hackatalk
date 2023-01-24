import 'react-native';

import * as React from 'react';

import EmptyListItem from '../EmptyListItem';
import {render} from '@testing-library/react-native';

describe('[EmptyListItem] render', () => {
  it('renders without crashing', () => {
    const screen = render(<EmptyListItem />);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
  });
});
