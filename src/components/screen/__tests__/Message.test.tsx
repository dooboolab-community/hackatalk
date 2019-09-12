import 'react-native';
import * as React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { fireEvent, render } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components/native';
import createTheme, { ThemeType } from '../../../utils/theme';
import Message from '../Message';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  createTheme,
};
const component: React.ReactElement = (
  <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
    <Message {...props}/>
  </ThemeProvider>
);
describe('rendering test', () => {
  it('should render as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });

  it('should navigate on item click', () => {
    const item = render(component).getByTestId('listitem0');
    fireEvent(item, 'press');
  });
});
