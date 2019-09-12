import 'react-native';
import * as React from 'react';
import FindPw from '../FindPw';
import { ThemeProvider } from 'styled-components/native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { fireEvent, render } from 'react-native-testing-library';
import createTheme, { ThemeType } from '../../../utils/theme';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  createTheme,
};
const component: React.ReactElement = (
  <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
    <FindPw {...props}/>
  </ThemeProvider>
);

describe('[FindPw] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[FindPw] interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let testingLib: any;

  beforeAll(() => {
    rendered = renderer.create(component);
    testingLib = render(component);
  });

  it('should invoke changeText event handler when email changed ', () => {
    const emailInput = testingLib.getByTestId('input_email');
    emailInput.props.onTextChanged('email test');
    expect(emailInput.props.txt).toEqual('email test');
  });

  it('should call [sendLink] on button click', () => {
    const btnSendLink = testingLib.getByTestId('btnSendLink');
    fireEvent(btnSendLink, 'press');
    expect(btnSendLink.props.isLoading).toEqual(false);
    btnSendLink.props.onPress();
    expect(btnSendLink.props.isLoading).toEqual(true);
  });
});
