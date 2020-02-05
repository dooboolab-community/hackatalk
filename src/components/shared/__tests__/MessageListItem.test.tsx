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
    const { baseElement } = render(component);
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });

  it('renders [peerMessage] with URL as expected', () => {
    props.item.sender.photoURL = 'https://';
    component = createTestElement(<MessageListItem {...props} />);
    const { baseElement } = render(component);
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
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
