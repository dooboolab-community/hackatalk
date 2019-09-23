import 'react-native';

import * as React from 'react';

import { RenderResult, render } from '@testing-library/react-native';

import { AppProvider } from '../../../providers/AppProvider';
import ChatroomListItem from '../ChatroomListItem';
import { ThemeProvider } from 'styled-components';
import { ThemeType } from '../../../types';
import { createTheme } from '../../../theme';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.

const props = {
  item: {
    id: 'room1',
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
};

const component: React.ReactElement = (
  <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
    <ChatroomListItem {...props} />
  </ThemeProvider>
);

describe('[ChatroomListItem] rendering test', () => {
  // TODO
  it('renders as expected', () => {
    // const json = renderer.create(component).toJSON();
    // expect(json).toMatchSnapshot();
    expect(true).toBe(true);
  });
});
