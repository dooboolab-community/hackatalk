import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Chat from '../Chat';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let props: any;
let component: ReactElement;

describe('[Chat] rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Chat {...props} />);
  });

  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Chat] interaction', () => {
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
    props.pressTest.mockReset();
    const touchMenu = testingLib.getByTestId('touch_menu');

    fireEvent.press(touchMenu);
    expect(props.pressTest).toHaveBeenCalledTimes(1);
  });

  it('should [sendChat] when pressing button', () => {
    let chatBtn = testingLib.getByTestId('btn_chat');
    chatBtn = testingLib.getByTestId('btn_chat');
    fireEvent.press(chatBtn);
  });

  afterAll(() => {
    cleanup();
  });
});
