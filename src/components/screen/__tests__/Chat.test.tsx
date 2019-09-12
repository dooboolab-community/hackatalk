import 'react-native';
import React, { ReactElement } from 'react';
import Chat from '../Chat';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';
import { fireEvent, render } from 'react-native-testing-library';
import createTheme, { ThemeType } from '../../../utils/theme';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  createTheme,
};

const component: ReactElement = (
  <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
    <Chat {...props} />
  </ThemeProvider>
);

describe('[Chat] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Login] interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let testingLib: any;

  beforeAll(() => {
    rendered = renderer.create(component);
    testingLib = render(component);
  });

  it('should invoke changeText event handler when message changed', () => {
    const textInput = testingLib.getByTestId('input_chat');
    jest.useFakeTimers();
    jest.runAllTimers();
    fireEvent.changeText(textInput, 'chat test');
    expect(textInput.props.value).toEqual('chat test');
  });

  it('should call [setShowMenu] when focused', () => {
    const textInput = testingLib.getByTestId('input_chat');
    textInput.props.onFocus();
  });

  it('should [showMenu] when touch pressed', () => {
    let touchMenu = testingLib.getByTestId('touch_menu');
    fireEvent(touchMenu, 'press');

    touchMenu = testingLib.getByTestId('touch_menu');
    fireEvent(touchMenu, 'press');
  });

  it('should call [setShowMenu] when focused', () => {
    const touchMenu = testingLib.getByTestId('touch_menu');
    fireEvent(touchMenu, 'press');
  });

  it('should [sendChat] when pressing button', () => {
    let chatBtn = testingLib.getByTestId('btn_chat');
    fireEvent(chatBtn, 'press');

    const touchMenu = testingLib.getByTestId('touch_menu');
    fireEvent(touchMenu, 'press');

    chatBtn = testingLib.getByTestId('btn_chat');
    fireEvent(chatBtn, 'press');
  });
});
