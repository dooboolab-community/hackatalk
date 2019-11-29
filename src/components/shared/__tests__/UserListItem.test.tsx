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
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let cnt = 0;
const onPress = (): void => {
  cnt++;
};

const propsObj = {
  testID: 'test_yo',
  user: {
    uid: '',
    displayName: '',
    thumbURL: null,
    photoURL: null,
    statusMsg: '',
    online: false,
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
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
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
