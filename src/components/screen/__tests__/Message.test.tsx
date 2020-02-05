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

import Message from '../Message';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;

jest.mock('expo-permissions', () => ({
  askAsync: (): string => 'granted',
}));

jest.mock('expo-image-picker', () => ({
  launchCameraAsync: (): string => 'photo info',
  launchImageLibraryAsync: (): string => 'photo info',
}));

describe('[Message] rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Message {...props} />);
  });

  it('renders as expected', () => {
    const { baseElement } = render(component);
    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});

describe('[Message] interaction', () => {
  let testingLib: RenderResult;

  beforeAll(() => {
    testingLib = render(component);
  });

  afterAll(() => {
    cleanup();
  });

  it('should [sendMessage] when pressing button', () => {
    let MessageBtn = testingLib.getByTestId('btn-message');
    MessageBtn = testingLib.getByTestId('btn-message');
    fireEvent.press(MessageBtn);
  });

  describe('dispatch showModal', () => {
    it('should dispatch [show-modal] when peerImage is pressed', () => {
      jest
        .spyOn(ProfileContext, 'useProfileContext')
        .mockImplementation(() => ({
          showModal: jest.fn(),
          state: null,
        }));
      const MessageListItem = testingLib.queryByTestId('message-list-item0');
      act(() => {
        fireEvent.press(MessageListItem);
      });
    });

    it('should call [show-modal] when modal is available', () => {
      const mockedData = {
        showModal: jest.fn(),
        state: {
          user: null,
          deleteMode: true,
          modal: jest.mock,
        },
      };
      jest
        .spyOn(ProfileContext, 'useProfileContext')
        // @ts-ignore
        .mockImplementation(() => mockedData);
      const MessageListItem = testingLib.queryByTestId('message-list-item0');
      testingLib.rerender(component);
      act(() => {
        fireEvent.press(MessageListItem);
      });
      expect(mockedData.showModal).toHaveBeenCalledTimes(1);
    });
  });

  it('should open image library when pressing photo icon button', () => {
    const touchMenu = testingLib.getByTestId('touch-menu');
    act(() => {
      fireEvent.press(touchMenu);
    });
    const photoBtn = testingLib.getByTestId('icon-photo');

    act(() => {
      fireEvent.press(photoBtn);
    });
  });

  it('should open camera when pressing camera icon button', () => {
    const cameraBtn = testingLib.getByTestId('icon-camera');
    act(() => {
      fireEvent.press(cameraBtn);
    });
  });
});
