import 'react-native';

import * as React from 'react';

import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import UserListItem from '../UserListItem';

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
    created: undefined,
    updated: undefined,
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
    const { baseElement } = render(component);
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('[UserListItem] interaction', () => {
  let testingLib: RenderResult;
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
