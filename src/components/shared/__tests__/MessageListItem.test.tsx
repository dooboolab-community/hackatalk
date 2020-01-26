import 'react-native';

import * as React from 'react';

import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import MessageListItem from '../MessageListItem';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let props = {
  item: {
    id: '',
    sender: {
      id: '0',
      nickname: 'sender111',
      thumbURL: '',
      photoURL: '',
      statusMessage: '',
    },
    message: 'hello1',
  },
  prevItem: {
    id: '',
    sender: {
      id: '0',
      nickname: 'sender111',
      thumbURL: '',
      photoURL: '',
      statusMessage: '',
    },
    message: 'hello1',
  },
  onPressPeerImage: jest.fn(),
  testID: 'chat-list-item0',
};
let component: React.ReactElement;

describe('[MessageListItem] rendering test', () => {
  beforeEach(() => {
    props = createTestProps(props);
    component = createTestElement(<MessageListItem {...props} />);
  });

  afterAll(() => cleanup());

  it('renders [peerMessage] as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders [peerMessage] with URL as expected', () => {
    props.item.sender.photoURL = 'https://';
    component = createTestElement(<MessageListItem {...props} />);
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[MessageListItem] interaction', () => {
  let testingLib: RenderResult;
  let component;

  beforeEach(() => {
    props = createTestProps(props);
    component = createTestElement(<MessageListItem {...props} />);
    testingLib = render(component);
  });

  it('should fireEvent when peer image is pressed', () => {
    const touchPeerImage = testingLib.getByTestId(props.testID);
    fireEvent.press(touchPeerImage);
    expect(props.onPressPeerImage).toHaveBeenCalledTimes(1);
  });

  afterAll(() => cleanup());
});
