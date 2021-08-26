import 'react-native';

import {Channel, Membership} from '../../../types/graphql';

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
    expect(json).toMatchSnapshot();
  });

  it('renders when channelType is public', () => {
    TEST_CHANNEL.channelType = 'public';

    const component = createTestElement(
      <ChannelListItem item={TEST_CHANNEL} lastMessageCnt={3} />,
    );

    const screen = render(component);

    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });

  it('renders [StyledMeCircleView] when channelType is "self"', () => {
    TEST_CHANNEL.channelType = 'self';

    const component = createTestElement(
      <ChannelListItem item={TEST_CHANNEL} lastMessageCnt={3} />,
    );

    const {getByText} = render(component);

    expect(getByText('Me')).toBeTruthy();
  });

  it('renders "renderSingleImage" as expected', () => {
    TEST_CHANNEL.channelType = 'self';
    TEST_CHANNEL.memberships = MEMBERSHIPS.slice(0, 1);

    const component = createTestElement(
      <ChannelListItem item={TEST_CHANNEL} />,
    );
    const screen = render(component);

    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });

  it('renders "renderSingleImage" without photoURL as expected', () => {
    TEST_CHANNEL.channelType = 'self';
    TEST_CHANNEL.memberships = MEMBERSHIPS.slice(4);

    const component = createTestElement(
      <ChannelListItem item={TEST_CHANNEL} />,
    );

    const screen = render(component);

    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });

  it('renders "renderMultiImages" when 1000+ users exited', () => {
    TEST_CHANNEL.memberships = new Array(201).fill(MEMBERSHIPS).flat();

    const component = createTestElement(
      <ChannelListItem item={TEST_CHANNEL} />,
    );

    const {getByText} = render(component);

    expect(getByText('+>1000')).toBeTruthy();
  });

  it('renders [StyledTextDate] when createdAt is undefined', () => {
    TEST_CHANNEL.lastMessage.createdAt = undefined;

    const component = createTestElement(
      <ChannelListItem item={TEST_CHANNEL} />,
    );

    const {getByText} = render(component);

    expect(getByText('nan')).toBeTruthy();
  });

  it('renders [StyledTextMessage] when lastMessage has multiple images', () => {
    TEST_CHANNEL.lastMessage.imageUrls = [
      'https://picsum.photos/201',
      'https://picsum.photos/202',
    ];

    const component = createTestElement(
      <ChannelListItem item={TEST_CHANNEL} />,
    );

    const {getByText} = render(component);

    expect(getByText('Photo')).toBeTruthy();
  });
});
