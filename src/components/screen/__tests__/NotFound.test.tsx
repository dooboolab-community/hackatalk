import 'react-native';
import * as React from 'react';
import NotFound from '../NotFound';
import { ThemeProvider } from 'styled-components/native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

const component: React.ReactElement = <NotFound />;

describe('[NotFound] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});
