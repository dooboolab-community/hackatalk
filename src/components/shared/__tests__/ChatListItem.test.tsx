import 'react-native';

import * as React from 'react';

import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

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

let props = {
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
  onPressPeerImage: jest.fn(),
  createTheme,
  testID: 'chatListItem0',
};
let component;
// let component: React.ReactElement = ( // FIXME: 삭제
//   <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
//     <ChatListItem {...props} />
//   </ThemeProvider>
// );

describe('[ChatListItem] rendering test', () => {
  beforeEach(() => {
    props = createTestProps(props);
    component = createTestElement(<ChatListItem {...props} />);
  });

  afterAll(() => cleanup());

  it('renders [peerMessage] as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });

  // jere
  it('renders [peerMessage] with URL as expected', () => {
    props.item.sender.photoURL = 'https://';
    component = (
      <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
        <ChatListItem {...props} />
      </ThemeProvider>
    );
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[ChatListItem] interaction', () => {
  let testingLib: RenderResult;

  beforeAll(() => {
    testingLib = render(component);
  });

  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<ChatListItem {...props} />);
  });

  it('should fireEvent when peer image is pressed', () => {
    testingLib.debug();
    const touchPeerImage = testingLib.getByTestId(props.testID);
    fireEvent.press(touchPeerImage);
    expect(props.onPressPeerImage).toHaveBeenCalledTimes(1);
  });

  afterAll(() => cleanup());
});
