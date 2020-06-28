import 'react-native';

import React, { ReactElement } from 'react';
import { RenderResult, render } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import ChannelListItem from '../ChannelListItem';

// Note: test renderer must be required after react-native.

describe('[ChannelListItem] rendering test', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any;
  let component: ReactElement;
  let testingLib: RenderResult;

  beforeEach(() => {
    props = createTestProps({
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
          message: 'How are you doing?',
          created: '2020-01-01 12:00',
          updated: '2020-01-01 12:00',
        },
        lastMessageCnt: 3,
      },
    });
    component = createTestElement(<ChannelListItem {...props} />);
    testingLib = render(component);
  });

  it('renders as expected', () => {
    const { baseElement } = testingLib;
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
