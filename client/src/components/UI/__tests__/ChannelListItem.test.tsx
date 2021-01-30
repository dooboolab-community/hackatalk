import 'react-native';

import {createTestElement, createTestProps} from '../../../../test/testUtils';

import ChannelListItem from '../molecules/ChannelListItem';
import React from 'react';
import {render} from '@testing-library/react-native';

const props = createTestProps({
  item: {
    id: 'room1',
    secret: 'secret1',
    lastMessage: {
      id: 'id_3',
      sender: {
        id: 'uid_3',
        nickname: 'displayName3',
        thumbURL: '',
      },
      text: 'How are you doing?',
      createdAt: '2020-01-01 12:00',
      updatedAt: '2020-01-01 12:00',
    },
    lastMessageCnt: 3,
  },
});

const component = createTestElement(<ChannelListItem {...props} />);

describe('[ChannelListItem] rendering test', () => {
  it('renders as expected', () => {
    const json = render(component).toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});
