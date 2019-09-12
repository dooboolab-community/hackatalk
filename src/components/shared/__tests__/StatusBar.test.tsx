import 'react-native';
import * as React from 'react';
import StatusBar from '../StatusBar';
import { ThemeProvider } from 'styled-components/native';
import createTheme, { ThemeType } from '../../../utils/theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const props = {
  isDarkContent: false,
  createTheme,
};

const component: React.ReactElement = (
  <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
    <StatusBar {...props} />
  </ThemeProvider>
);

describe('[UserListItem] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
  it('renders [isDarkContent] as expected', () => {
    const disabledComponent: React.ReactElement = (
      <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
        <StatusBar {...props} />
      </ThemeProvider>
    );
    const json = renderer.create(disabledComponent).toJSON();
    expect(json).toMatchSnapshot();
  });
});
