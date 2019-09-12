import 'react-native';
import * as React from 'react';
import Login from '../Login';
import Button from '../../shared/Button';
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
    <Login {...props}/>
  </ThemeProvider>
);

describe('[Login] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Login] interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;
  let testingLib: any;

  beforeAll(() => {
    rendered = renderer.create(component);
    root = rendered.root;
    testingLib = render(component);
  });

  it('should invoke changeText event handler when email changed ', () => {
    const emailInput = testingLib.getByTestId('email_input');
    emailInput.props.onTextChanged('email test');
    expect(emailInput.props.txt).toEqual('email test');
  });

  it('should invoke changeText event handler when password changed ', () => {
    const passwordInput = testingLib.getByTestId('pw_input');
    passwordInput.props.onTextChanged('pw test');
    expect(passwordInput.props.txt).toEqual('pw test');
  });

  it('should simulate when [goToSignUp] is clicked', () => {
    const buttons = root.findAllByType(Button);
    buttons[0].props.onPress();
    expect(props.navigation.navigate).toBeCalledWith('SignUp');
  });

  it('should simulate when [onLogin] is clicked', () => {
    jest.useFakeTimers();
    const buttons = root.findAllByType(Button);
    fireEvent(testingLib.getByTestId('btnLogin'), 'press');

    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(buttons[0].props.isLoading).toEqual(false);
  });

  it('should simulate when [goToForgotPw] is clicked', () => {
    const findPwBtn = testingLib.getByTestId('findPw');
    fireEvent(findPwBtn, 'press');
    expect(props.navigation.navigate).toHaveBeenCalledWith('FindPw');
  });
});
