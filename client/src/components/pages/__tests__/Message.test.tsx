import 'react-native';

import * as ImagePicker from '../../../utils/ImagePicker';
import * as ProfileContext from '../../../providers/ProfileModalProvider';

import {Channel, Message as MessageType} from '../../../types/graphql';
import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import ReactNavigation, {RouteProp} from '@react-navigation/core';
import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';
import {fireEvent, render} from '@testing-library/react-native';

import {MainStackParamList} from '../../navigations/MainStackNavigator';
import Message from '../Message';
import React from 'react';

const mockNavigation = createMockNavigation();

const mockRoute: RouteProp<MainStackParamList, 'Message'> = {
  key: '',
  name: 'Message',
  params: {
    channel: {
      id: 'abcdef',
      channelType: 'private',
    },
    users: [
      {
        id: 'test-user-123',
        name: 'Alice',
      },
    ],
  },
};

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof ReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
  useRoute: () => mockRoute,
}));

jest.mock('expo-permissions', () => ({
  askAsync: (): string => 'granted',
}));

jest.mock('expo-image-picker', () => ({
  launchCameraAsync: (): string => 'photo info',
  launchImageLibraryAsync: (): string => 'photo info',
}));

const mockEnvironment = createMockEnvironment();

mockEnvironment.mock.queueOperationResolver((operation) => {
  return MockPayloadGenerator.generate(operation, {
    Channel: (_, generateId): Partial<Channel> => ({
      id: `test-channel-${generateId()}`,
      channelType: 'private',
      name: 'John Doe',
    }),
    Message: (_, generateId): Partial<MessageType> => ({
      id: `test-message-${generateId()}`,
      text: 'Hello there!',
      messageType: 'text',
      createdAt: '2021-03-19T04:30:30.162Z',
      sender: {
        id: 'test-user-111',
        name: 'John Doe',
        nickname: 'john',
        photoURL: 'https://example.com/myphoto.jpg',
        thumbURL: 'https://example.com/john-profile.jpg',
        hasBlocked: false,
        statusMessage: "I'm alive.",
      },
    }),
  });
});

describe('[Message] rendering test', () => {
  it('renders as expected', async () => {
    const component = createTestElement(<Message />, {
      environment: mockEnvironment,
    });

    const screen = render(component);

    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});

describe('[Message] interaction', () => {
  it('should [sendMessage] when pressing button', async () => {
    const component = createTestElement(<Message />, {
      environment: mockEnvironment,
    });

    const screen = render(component);

    const MessageBtn = screen.getByTestId('btn-message');

    fireEvent.press(MessageBtn);

    // TODO: Detect message sent.
  });

  describe('dispatch showModal', () => {
    it('should dispatch [show-modal] when peerImage is pressed', async () => {
      const mockShowModal = jest.fn();

      const component = createTestElement(<Message />, {
        environment: mockEnvironment,
      });

      jest
        .spyOn(ProfileContext, 'useProfileContext')
        .mockImplementation(() => ({
          showModal: mockShowModal,
          hideModal: jest.fn(),
          modalState: {isVisible: false},
        }));

      const screen = render(component);

      const messageListItem = screen.getByTestId('message-list-item0');

      fireEvent.press(messageListItem);

      expect(mockShowModal).toBeCalledTimes(1);
    });
  });

  it('should open image library when pressing photo icon button', async () => {
    const launchImageLibraryAsyncSpy = jest
      .spyOn(ImagePicker, 'launchImageLibraryAsync')
      .mockResolvedValue(null);

    const component = createTestElement(<Message />, {
      environment: mockEnvironment,
    });

    const screen = render(component);
    const touchMenu = screen.getByTestId('touch-menu');

    fireEvent.press(touchMenu);

    const photoBtn = screen.getByTestId('icon-photo');

    fireEvent.press(photoBtn);

    expect(launchImageLibraryAsyncSpy).toBeCalledTimes(1);

    await screen.findByTestId('btn-message');
  });

  it('should open camera when pressing camera icon button', async () => {
    const launchCameraAsyncSpy = jest
      .spyOn(ImagePicker, 'launchCameraAsync')
      .mockResolvedValue(null);

    const component = createTestElement(<Message />, {
      environment: mockEnvironment,
    });

    const screen = render(component);

    const touchMenu = screen.getByTestId('touch-menu');

    fireEvent.press(touchMenu);

    const cameraBtn = screen.getByTestId('icon-camera');

    fireEvent.press(cameraBtn);

    expect(launchCameraAsyncSpy).toHaveBeenCalledTimes(1);

    await screen.findByTestId('btn-message');
  });
});
