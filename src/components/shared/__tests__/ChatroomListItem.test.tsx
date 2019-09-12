import 'react-native';
import * as React from 'react';
import ChatroomListItem from '../ChatroomListItem';
import { ThemeProvider } from 'styled-components/native';
import creatTheme, { ThemeType } from '../../../utils/theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { Chatroom } from '../../../models/Chatroom';
import { Chat } from '../../../models/Chat';
import { User } from '../../../models/User';

const props = {
  item: new Chatroom(
    '',
    new Chat(
      '',
      new User('', '', '', ''),
      '',
    ),
  ),
};

const component: React.ReactElement = (
  <ThemeProvider theme={creatTheme(ThemeType.LIGHT)}>
    <ChatroomListItem {...props} />
  </ThemeProvider>
);

describe('[ChatroomListItem] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});
