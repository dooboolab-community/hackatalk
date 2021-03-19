import 'react-native';

import * as React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import GiftedChat from '../GiftedChat';
import {createTestElement} from '../../../../test/testUtils';

jest.useFakeTimers();

const TEST_MESSAGES = [
  {
    id: 'abcde',
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
    id: 'xyz',
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
    id: 'pqr',
    sender: {
      id: '0',
      nickname: 'sender111',
      thumbURL: '',
      photoURL: '',
      statusMessage: '',
    },
    message: 'hello',
  },
];

describe('[GiftedChatInput] render', () => {
  it('renders without crashing', () => {
    const component = createTestElement(
      <GiftedChat messages={TEST_MESSAGES} />,
    );

    const screen = render(component);

    const json = screen.toJSON();

    expect(json).toMatchSnapshot();
  });

  describe('interactions', () => {
    it('should toggle view menu when touch menu is pressed', async () => {
      const component = createTestElement(<GiftedChat />);
      const screen = render(component);

      // Press the touch menu for the first time.
      fireEvent.press(screen.getByTestId('touch-menu'));

      // View menu should be visible.
      expect(screen.getByTestId('view-menu')).toBeTruthy();

      // Press the touch menu again.
      fireEvent.press(screen.getByTestId('touch-menu'));

      // View menu should be gone.
      expect(screen.queryByTestId('view-menu')).toBeNull();
    });

    it('should invoke changeText event handler when message changed', async () => {
      const mockChangeMessage = jest.fn();

      const component = createTestElement(
        <GiftedChat onChangeMessage={mockChangeMessage} />,
      );

      const screen = render(component);
      const textInput = screen.getByTestId('input-chat');

      fireEvent.changeText(textInput, 'chat test');

      expect(mockChangeMessage).toBeCalledWith('chat test');
    });
  });
});
