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
  onPressPeerImage,
  createTheme,
};
let component;

describe('[ChatListItem] rendering test', () => {
  beforeEach(() => {
    props = createTestProps(props);
    component = createTestElement(<ChatListItem {...props} />);
  });

  it('renders [peerMessage] as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });

  afterAll(() => cleanup());
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
    const touchPeerImage = testingLib.getByTestId('peer_image');
    fireEvent.press(touchPeerImage);
    expect(cnt).toEqual(1);
  });

  afterAll(() => cleanup());
});
