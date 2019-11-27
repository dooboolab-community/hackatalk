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
import { createTheme } from '../../../theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

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
let component: React.ReactElement;

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

  it('renders [peerMessage] with URL as expected', () => {
    props.item.sender.photoURL = 'https://';
    component = createTestElement(<ChatListItem {...props} />);
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[ChatListItem] interaction', () => {
  let testingLib: RenderResult;
  let component;

  beforeEach(() => {
    props = createTestProps(props);
    component = createTestElement(<ChatListItem {...props} />);
    testingLib = render(component);
  });

  it('should fireEvent when peer image is pressed', () => {
    const touchPeerImage = testingLib.getByTestId(props.testID);
    fireEvent.press(touchPeerImage);
    expect(props.onPressPeerImage).toHaveBeenCalledTimes(1);
  });

  afterAll(() => cleanup());
});
