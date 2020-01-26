import 'react-native';

import * as React from 'react';

import { RenderResult, fireEvent, render } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import GiftedChatInput from '../GiftedChat';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;

describe('[GiftedChatInput] render', () => {
  beforeEach(() => {
    props = createTestProps({
      messages: [
        {
          id: '',
          sender: {
            id: '0',
            nickname: 'sender111',
            thumbURL: '',
            photoURL: '',
            statusMessage: '',
          },
          message: 'hello1',
        },
        {
          id: '',
          sender: {
            id: '2',
            nickname: 'sender111',
            thumbURL: '',
            photoURL: '',
            statusMessage: '',
          },
          message:
            'Hello2. This is long message. This is long message.This is long message.' +
            'This is long message. This is long message. This is long message.' +
            'This is long message. This is long message.' +
            'This is long message. This is long message. This is long message.',
        },
        {
          id: '',
          sender: {
            id: '0',
            nickname: 'sender111',
            thumbURL: '',
            photoURL: '',
            statusMessage: '',
          },
          message: 'hello',
        },
      ],
    });
    component = createTestElement(<GiftedChatInput {...props} />);
  });

  it('renders without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON | null = renderer
      .create(component)
      .toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('interactions', () => {
    let testingLib: RenderResult;

    beforeEach(() => {
      testingLib = render(component);
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

    it('should invoke changeText event handler when message changed', () => {
      const textInput = testingLib.getByTestId('input_chat');
      jest.useFakeTimers();
      jest.runAllTimers();
      fireEvent.changeText(textInput, 'chat test');
      // TODO: expect should pass
      // expect(textInput.props.value).toEqual('chat test');
    });
  });
});
