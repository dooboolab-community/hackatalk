import 'react-native';
import * as React from 'react';
import Friend from '../Friend';
import { ThemeProvider } from 'styled-components/native';
import createTheme, { ThemeType } from '../../../utils/theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { fireEvent, render } from 'react-native-testing-library';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  createTheme,
};
const component: React.ReactElement = (
  <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
    <Friend {...props}/>
  </ThemeProvider>
);

describe('[Friend] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Friend] interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let testingLib: any;

  beforeAll(() => {
    rendered = renderer.create(component);
    testingLib = render(component);
  });

  it('should dispatch [show-modal] when user is pressed', () => {
    const user = testingLib.getByTestId('user');
    fireEvent(user, 'press');
  });
});
