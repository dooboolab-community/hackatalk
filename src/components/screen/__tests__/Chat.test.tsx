import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';

import Chat from '../Chat';
import { StateProvider } from '../../../contexts';
import { ThemeProvider } from 'styled-components/native';
import { ThemeType } from '../../../types';
import { createTheme } from '../../../theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

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
  let testingLib: RenderResult;

  beforeAll(() => {
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
    fireEvent.press(touchMenu);

    touchMenu = testingLib.getByTestId('touch_menu');
    fireEvent.press(touchMenu);
  });

  it('should call [setShowMenu] when focused', () => {
    const touchMenu = testingLib.getByTestId('touch_menu');
    fireEvent.press(touchMenu);
  });

  it('should [sendChat] when pressing button', () => {
    let chatBtn = testingLib.getByTestId('btn_chat');
    fireEvent.press(chatBtn);

    const touchMenu = testingLib.getByTestId('touch_menu');
    fireEvent.press(touchMenu);

    chatBtn = testingLib.getByTestId('btn_chat');
    fireEvent.press(chatBtn);
  });
});
