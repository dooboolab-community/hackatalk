import 'react-native';

import * as React from 'react';

import {
  RenderAPI,
  act,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import UserListItem from '../UserListItem';

jest.useFakeTimers();

let cnt = 0;

const onPress = (): void => {
  cnt++;
};

const propsObj = {
  testID: 'test_yo',
  user: {
    id: '',
    nickname: '',
    thumbURL: null,
    photoURL: null,
    statusMessage: '',
    isOnline: false,
    createdAt: undefined,
    updatedAt: undefined,
  },
  onPress,
};

describe('[UserListItem] rendering test', () => {
  let props;
  let component;

  beforeEach(() => {
    props = createTestProps(propsObj);
    component = createTestElement(<UserListItem {...props} />);
  });

  it('renders as expected', () => {
    const json = render(component).toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});

describe('[UserListItem] interaction', () => {
  let testingLib: RenderAPI;
  let props;
  let component;

  beforeEach(() => {
    props = createTestProps(propsObj);
    component = createTestElement(<UserListItem {...props} />);
    testingLib = render(component);
  });

  afterAll(() => {
    cleanup();
  });

  it('should fireEvent when peer image is pressed', () => {
    act(() => {
      fireEvent.press(testingLib.getByTestId('test_yo'));
    });

    expect(cnt).toEqual(1);
  });
});
