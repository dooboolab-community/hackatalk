import 'react-native';

import {Channel} from '../../../types/graphql';
import ChannelListItem from '../ChannelListItem';
import React from 'react';
import {createTestElement} from '../../../../test/testUtils';
import {render} from '@testing-library/react-native';

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
});
