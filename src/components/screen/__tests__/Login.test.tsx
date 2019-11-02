import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../utils/testUtils';

import Button from '../../shared/Button';
import Login from '../Login';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let props: any;
let component: ReactElement;

describe('[Login] rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Login {...props} />);
  });

  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Login] interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;
  let testingLib: RenderResult;

  beforeAll(() => {
    rendered = renderer.create(component);
    root = rendered.root;
    testingLib = render(component);
  });

  it('should invoke changeText event handler when email changed ', () => {
    const textInput = testingLib.getByTestId('email_input');
    jest.useFakeTimers();
    jest.runAllTimers();
    fireEvent.changeText(textInput, 'email test');
    expect(textInput.props.value).toEqual('email test');
  });

  it('should invoke changeText event handler when password changed ', () => {
    const textInput = testingLib.getByTestId('pw_input');
    jest.useFakeTimers();
    jest.runAllTimers();
    fireEvent.changeText(textInput, 'pw test');
    expect(textInput.props.value).toEqual('pw test');
  });

  it('should simulate when [goToSignUp] is clicked', () => {
    const btnSignUp = testingLib.getByTestId('btnSignUp');
    act(() => {
      fireEvent.press(btnSignUp);
    });
    expect(props.navigation.navigate).toHaveBeenCalledWith('SignUp');
  });

  it('should simulate when [onLogin] is clicked', () => {
    jest.useFakeTimers();
    const buttons = root.findAllByType(Button);
    act(() => {
      fireEvent.press(testingLib.getByTestId('btnLogin'));
    });

    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(buttons[0].props.isLoading).toEqual(false);
  });

  it('should simulate when [goToForgotPw] is clicked', () => {
    const findPwBtn = testingLib.getByTestId('findPw');
    act(() => {
      fireEvent.press(findPwBtn);
    });
    expect(props.navigation.navigate).toHaveBeenCalledWith('FindPw');
  });

  afterAll(() => {
    cleanup();
  });
});
