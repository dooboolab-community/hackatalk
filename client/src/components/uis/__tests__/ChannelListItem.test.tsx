import 'react-native';

import type {Channel, Membership} from '../../../types/graphql';

import ChannelListItem from '../ChannelListItem';
import React from 'react';
import {createTestElement} from '../../../../test/testUtils';
import {render} from '@testing-library/react-native';

const MEMBERSHIPS: Membership[] = [
  {
    isVisible: true,
    user: {
      id: `userId-0`,
      photoURL: 'https://picsum.photos/200',
      isOnline: true,
    },
  },
  {
    isVisible: true,
    user: {
      id: `userId-1`,
      thumbURL: 'https://picsum.photos/200',
    },
  },
  {
    isVisible: true,
    user: {
      id: `userId-2`,
      photoURL: 'https://picsum.photos/201',
      isOnline: true,
    },
  },
  {isVisible: true, user: {id: `userId-3`}},
  {isVisible: true, user: {id: `userId-4`}},
];

const TEST_CHANNEL: Channel = {
  id: 'test-channel-111',
  channelType: 'private',
  lastMessage: {
    id: 'test-message-2022',
    messageType: 'text',
    sender: {
      id: 'test-user-999',
      nickname: 'displayName3',
      thumbURL: 'https://example.com/hola.png',
    },
    text: 'How are you doing?',
    createdAt: '2020-01-01 12:00',
    updatedAt: '2020-01-01 12:00',
  },
  memberships: MEMBERSHIPS,
};

describe('[ChannelListItem] rendering test', () => {
  it('renders as expected', () => {
    const component = createTestElement(
      <ChannelListItem item={TEST_CHANNEL} lastMessageCnt={3} />,
    );

    const screen = render(component);

    const json = screen.toJSON();

    expect(json).toBeTruthy();
  });

  it('renders when channelType is public', () => {
    const channel = {
      ...TEST_CHANNEL,
      channelType: 'public',
    };

    const component = createTestElement(
      <ChannelListItem item={channel} lastMessageCnt={3} />,
    );

    const screen = render(component);

    const json = screen.toJSON();

    expect(json).toBeTruthy();
  });

  it('renders [StyledMeCircleView] when channelType is "self"', () => {
    const channel = {
      ...TEST_CHANNEL,
      channelType: 'self',
    };

    const component = createTestElement(
      <ChannelListItem item={channel} lastMessageCnt={3} />,
    );

    const {getByText} = render(component);

    expect(getByText('Me')).toBeTruthy();
  });

  it('renders "renderSingleImage" as expected', () => {
    const channel = {
      ...TEST_CHANNEL,
      channelType: 'self',
      memberships: MEMBERSHIPS.slice(0, 1),
    };

    const component = createTestElement(<ChannelListItem item={channel} />);
    const screen = render(component);

    const json = screen.toJSON();

    expect(json).toBeTruthy();
  });

  it('renders "renderSingleImage" without photoURL as expected', () => {
    const channel = {
      ...TEST_CHANNEL,
      channelType: 'self',
      memberships: MEMBERSHIPS.slice(4),
    };

    const component = createTestElement(<ChannelListItem item={channel} />);

    const screen = render(component);

    const json = screen.toJSON();

    expect(json).toBeTruthy();
  });

  it('renders "renderMultiImages" when 1000+ users exited', () => {
    const channel = {
      ...TEST_CHANNEL,
      memberships: new Array(201).fill(MEMBERSHIPS).flat(),
    };

    const component = createTestElement(<ChannelListItem item={channel} />);

    const {getByText} = render(component);

    expect(getByText('+>1000')).toBeTruthy();
  });

  it('renders [StyledTextDate] when createdAt is undefined', () => {
    const channel = {
      ...TEST_CHANNEL,
      lastMessage: {...TEST_CHANNEL.lastMessage, createdAt: undefined},
    };

    const component = createTestElement(<ChannelListItem item={channel} />);

    const {getByText} = render(component);

    expect(getByText('nan')).toBeTruthy();
  });

  it('renders [StyledTextMessage] when lastMessage has multiple images', () => {
    const channel = {
      ...TEST_CHANNEL,
      lastMessage: {
        ...TEST_CHANNEL.lastMessage,
        messageType: 'photo',
        imageUrls: ['https://picsum.photos/201', 'https://picsum.photos/202'],
      },
    };

    const component = createTestElement(<ChannelListItem item={channel} />);

    const {getByText} = render(component);

    expect(getByText('Photo')).toBeTruthy();
  });

  it('renders [StyledTextMessage] when lastMessage has video', () => {
    const channel = {
      ...TEST_CHANNEL,
      lastMessage: {
        ...TEST_CHANNEL.lastMessage,
        messageType: 'file',
        fileUrls: [
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        ],
      },
    };

    const component = createTestElement(<ChannelListItem item={channel} />);

    const {getByText} = render(component);

    expect(getByText('Video')).toBeTruthy();
  });
});
