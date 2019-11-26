import 'react-native';

import * as ProfileContext from '../../../providers/ProfileModalProvider';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
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

  afterAll(() => {
    cleanup();
  });

  it('should [sendChat] when pressing button', () => {
    let chatBtn = testingLib.getByTestId('btn_chat');
    chatBtn = testingLib.getByTestId('btn_chat');
    fireEvent.press(chatBtn);
  });

  describe('dispatch showModal', () => {
    it('should dispatch [show-modal] when peerImage is pressed', () => {
      jest
        .spyOn(ProfileContext, 'useProfileContext')
        .mockImplementation(() => ({
          showModal: jest.fn(),
          state: null,
        }));
      const chatListItem = testingLib.queryByTestId('CHAT_LIST_ITEM0');
      act(() => {
        fireEvent.press(chatListItem);
      });
    });

    it('should call [show-modal] when modal is available', () => {
      jest
        .spyOn(ProfileContext, 'useProfileContext')
        .mockImplementation(() => ({
          showModal: jest.fn(),
          state: {
            user: null,
            deleteMode: true,
            modal: jest.mock,
          },
        }));
      const chatListItem = testingLib.queryByTestId('CHAT_LIST_ITEM0');
      testingLib.rerender(component);
      act(() => {
        fireEvent.press(chatListItem);
      });
    });
  });
});
