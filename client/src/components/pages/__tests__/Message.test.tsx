import 'react-native';

import * as ImagePickerUtil from '../../../utils/ImagePicker';
import * as ProfileContext from '../../../providers/ProfileModalProvider';

import type {Channel, Message as MessageType} from '../../../types/graphql';
import {
  createMockNavigation,
  createTestElement,
  resolveAllOperations,
} from '../../../../test/testUtils';
import {fireEvent, render} from '@testing-library/react-native';

import type {MainStackParamList} from '../../navigations/MainStackNavigator';
import Message from '../Message';
import type {MockPayloadGenerator} from 'relay-test-utils';
import React from 'react';
import type {RouteProp} from '@react-navigation/core';
import {createMockEnvironment} from 'relay-test-utils';
import type mockReactNavigation from '@react-navigation/core';

jest.mock('../../uis/CustomLoadingIndicator', () => 'test');

const mockNavigation = createMockNavigation();

const mockRoute: RouteProp<MainStackParamList, 'Message'> = {
  key: '',
  name: 'Message',
  params: {
    channelId: 'abcdef',
  },
};

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
  useRoute: () => mockRoute,
}));

jest.mock('expo-image-picker', () => ({
  launchCameraAsync: (): string => 'photo info',
  launchImageLibraryAsync: (): string => 'photo info',
}));

jest.mock('../../../utils/image.ts', () => ({
  resizePhotoToMaxDimensionsAndCompressAsPNG: (): string =>
    'resized photo info',
}));

jest.mock('../../../hooks/useAppStateChangeHandler.tsx', () => jest.fn());

const mockEnvironment = createMockEnvironment();

const resolver: MockPayloadGenerator.MockResolvers = {
  Channel: (context, generateId): Partial<Channel> => ({
    id: context.args?.channelId ?? `test-channel-${generateId()}`,
    channelType: 'private',
    name: 'John Doe',
    memberships: [
      {
        user: {
          id: 'test-user-123',
          nickname: 'alice',
          name: 'Alice Downer',
        },
        isVisible: true,
      },
      {
        user: {
          id: 'test-user-111',
          nickname: 'john',
          name: 'John Doe',
        },
        isVisible: true,
      },
    ],
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
};

describe('[Message] rendering test', () => {
  it('renders as expected', async () => {
    const component = createTestElement(<Message />, {
      environment: mockEnvironment,
    });

    const screen = render(component);

    resolveAllOperations(mockEnvironment, resolver);
    // await screen.findByText('john');

    const json = screen.toJSON();

    expect(json).toBeTruthy();
  });
});

describe('[Message] interaction', () => {
  it('should [sendMessage] when pressing button', async () => {
    const component = createTestElement(<Message />, {
      environment: mockEnvironment,
    });

    const screen = render(component);

    resolveAllOperations(mockEnvironment, resolver);

    const MessageBtn = screen.getByRole('button');

    fireEvent.press(MessageBtn);

    expect(MessageBtn).toBeTruthy();

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

      resolveAllOperations(mockEnvironment, resolver);

      const messageListItem = screen.getByTestId('message-list-item0');

      fireEvent.press(messageListItem);

      expect(mockShowModal).toBeCalledTimes(1);
    });
  });

  it('should open image library when pressing photo icon button', async () => {
    const launchMediaLibraryAsyncSpy = jest
      .spyOn(ImagePickerUtil, 'launchMediaLibraryAsync')
      .mockResolvedValue({
        cancelled: false,
        uri: 'filename://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        width: 1920,
        height: 1024,
        type: 'video',
      });

    const component = createTestElement(<Message />, {
      environment: mockEnvironment,
    });

    const screen = render(component);

    resolveAllOperations(mockEnvironment, resolver);

    const touchMenu = screen.getByTestId('touch-menu');

    fireEvent.press(touchMenu);

    const photoBtn = screen.getByTestId('icon-photo');

    fireEvent.press(photoBtn);

    expect(launchMediaLibraryAsyncSpy).toBeCalledTimes(1);

    await screen.findByRole('button');
  });

  it('should open camera when pressing camera icon button', async () => {
    const launchCameraAsyncSpy = jest
      .spyOn(ImagePickerUtil, 'launchCameraAsync')
      .mockResolvedValue({
        cancelled: false,
        uri: 'filename://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        width: 2080,
        height: 1924,
        type: 'image',
      });

    const component = createTestElement(<Message />, {
      environment: mockEnvironment,
    });

    const screen = render(component);

    resolveAllOperations(mockEnvironment, resolver);

    const touchMenu = screen.getByTestId('touch-menu');

    fireEvent.press(touchMenu);

    const cameraBtn = screen.getByTestId('icon-camera');

    fireEvent.press(cameraBtn);

    expect(launchCameraAsyncSpy).toHaveBeenCalledTimes(1);

    await screen.findByRole('button');
  });
});
