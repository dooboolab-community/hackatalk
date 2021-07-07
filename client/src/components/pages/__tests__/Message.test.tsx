import 'react-native';

import * as ImagePicker from '../../../utils/ImagePicker';
import * as ProfileContext from '../../../providers/ProfileModalProvider';

import {Channel, Message as MessageType} from '../../../types/graphql';
import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import {
  createMockNavigation,
  createTestElement,
  resolveAllOperations,
} from '../../../../test/testUtils';
import {fireEvent, render} from '@testing-library/react-native';
import mockmockReactNavigation, {RouteProp} from '@react-navigation/core';

import {MainStackParamList} from '../../navigations/MainStackNavigator';
import Message from '../Message';
import React from 'react';

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
  ...jest.requireActual<typeof mockmockReactNavigation>(
    '@react-navigation/core',
  ),
  useNavigation: () => mockNavigation,
  useRoute: () => mockRoute,
}));

jest.mock('expo-image-picker', () => ({
  launchCameraAsync: (): string => 'photo info',
  launchImageLibraryAsync: (): string => 'photo info',
}));

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
    await screen.findByText('john');

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

    resolveAllOperations(mockEnvironment, resolver);

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

      resolveAllOperations(mockEnvironment, resolver);

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

    resolveAllOperations(mockEnvironment, resolver);

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

    resolveAllOperations(mockEnvironment, resolver);

    const touchMenu = screen.getByTestId('touch-menu');

    fireEvent.press(touchMenu);

    const cameraBtn = screen.getByTestId('icon-camera');

    fireEvent.press(cameraBtn);

    expect(launchCameraAsyncSpy).toHaveBeenCalledTimes(1);

    await screen.findByTestId('btn-message');
  });
});
