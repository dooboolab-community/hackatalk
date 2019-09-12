import 'react-native';
import * as React from 'react';
import ChatListItem from '../ChatListItem';
import { ThemeProvider } from 'styled-components/native';
import createTheme, { ThemeType } from '../../../utils/theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { fireEvent, render } from 'react-native-testing-library';
import { Chat } from '../../../models/Chat';
import { User } from '../../../models/User';

let cnt = 0;
const onPressPeerImage = () => {
  cnt++;
};

const props = {
  item: new Chat(
    '',
    new User('', '', '', ''),
    '',
  ),
  prevItem: new Chat(
    '',
    new User('', '', '', ''),
    '',
  ),
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
  let rendered: renderer.ReactTestRenderer;
  let testingLib: any;

  beforeAll(() => {
    rendered = renderer.create(component);
    testingLib = render(component);
  });

  it('should fireEvent when peer image is pressed', () => {
    const touchPeerImage = testingLib.getByTestId('peer_image');
    fireEvent(touchPeerImage, 'press');
    expect(cnt).toEqual(1);
  });
});
