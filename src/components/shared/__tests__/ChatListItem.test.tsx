import 'react-native';

import * as React from 'react';

import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';

import ChatListItem from '../ChatListItem';
import { ThemeProvider } from 'styled-components/native';
import { ThemeType } from '../../../types';
import { createTheme } from '../../../theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let cnt = 0;
const onPressPeerImage = (): void => {
  cnt++;
};

const props = {
  item: {
    id: '',
    sender: {
      uid: '0',
      displayName: 'sender111',
      thumbURL: '',
      photoURL: '',
      statusMsg: '',
    },
    message: 'hello1',
  },
  prevItem: {
    id: '',
    sender: {
      uid: '0',
      displayName: 'sender111',
      thumbURL: '',
      photoURL: '',
      statusMsg: '',
    },
    message: 'hello1',
  },
  onPressPeerImage,
  createTheme,
};
const component: React.ReactElement = (
  <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
    <ChatListItem {...props} />
  </ThemeProvider>
);

describe('[ChatListItem] rendering test', () => {
  it('renders [peerMessage] as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[ChatListItem] interaction', () => {
  let testingLib: RenderResult;

  beforeAll(() => {
    testingLib = render(component);
  });

  it('should fireEvent when peer image is pressed', () => {
    const touchPeerImage = testingLib.getByTestId('peer_image');
    fireEvent.press(touchPeerImage);
    expect(cnt).toEqual(1);
  });
});
