import 'react-native';

import * as React from 'react';

import {cleanup, fireEvent, render} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../../../../test/testUtils';

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
    // @ts-ignore
    component = createTestElement(<MessageListItem {...props} />);
  });

  afterAll(() => cleanup());

  it('renders [peerMessage] as expected', () => {
    const json = render(component);

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });

  it('renders [peerMessage] with URL as expected', () => {
    props.item.sender.photoURL = 'https://';
    // @ts-ignore
    component = createTestElement(<MessageListItem {...props} />);

    const json = render(component).toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});

describe('[MessageListItem] interaction', () => {
  beforeEach(() => {
    props = createTestProps(props);
    // @ts-ignore
    component = createTestElement(<MessageListItem {...props} />);
  });

  it('should fireEvent when peer image is pressed', () => {
    const {getByTestId} = render(component);
    const touchPeerImage = getByTestId(props.testID);

    fireEvent.press(touchPeerImage);
    expect(props.onPressPeerImage).toHaveBeenCalledTimes(1);
  });

  afterAll(() => cleanup());
});
