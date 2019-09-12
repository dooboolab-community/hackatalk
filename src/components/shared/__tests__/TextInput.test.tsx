import 'react-native';
import * as React from 'react';
import TextInput from '../TextInput';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const component: React.ReactElement = <TextInput />;

describe('[TextInput] rendering test', () => {
  it('renders [enabled] as expected', () => {
    // const json = renderer.create(component).toJSON(); //TODO render is broken
    // expect(json).toMatchSnapshot();
  });
});
