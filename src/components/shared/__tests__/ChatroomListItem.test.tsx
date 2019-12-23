import 'react-native';

import React, { ReactElement } from 'react';
import { RenderResult, render } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import ChatroomListItem from '../ChatroomListItem';

// Note: test renderer must be required after react-native.

describe('[ChatroomListItem] rendering test', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any;
  let component: ReactElement;
  let testingLib: RenderResult;

  beforeEach(() => {
    props = createTestProps({
      item: {
        id: 'room1',
        secret: 'secret1',
        lastChat: {
          id: 'id_3',
          sender: {
            uid: 'uid_3',
            displayName: 'displayName3',
            thumbURL: '',
            photoURL: '',
            statusMsg: '',
            online: false,
          },
          message: 'How are you doing?',
          created: new Date(0),
          updated: new Date(0),
        },
        lastChatCnt: 3,
      },
    });
    component = createTestElement(<ChatroomListItem {...props} />);
    testingLib = render(component);
  });

  it('renders as expected', () => {
    const { baseElement } = testingLib;
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
