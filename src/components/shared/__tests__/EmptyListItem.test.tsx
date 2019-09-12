import 'react-native';
import * as React from 'react';
import EmptyListItem from '../EmptyListItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

const component: React.ReactElement = <EmptyListItem/>;

describe('[EmptyListItem] rendering test', () => {
  it('renders as expected', () => {
    const disabledComponent: React.ReactElement = <EmptyListItem/>;
    const json = renderer.create(disabledComponent).toJSON();
    expect(json).toMatchSnapshot();
  });
});
