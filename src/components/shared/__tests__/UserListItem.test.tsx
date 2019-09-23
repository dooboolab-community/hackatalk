import 'react-native';

import * as React from 'react';

import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';

import { AppProvider } from '../../../providers/AppProvider';
import { ThemeProvider } from 'styled-components/native';
import { ThemeType } from '../../../types';
import UserListItem from '../UserListItem';
import { createTheme } from '../../../theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let cnt = 0;
const onPress = (): void => {
  cnt++;
};

const propsObj = {
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
  createTheme,
};

const createTestProps = (obj: object): object => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...obj,
});

describe('[UserListItem] rendering test', () => {
  let props;
  let component;

  beforeEach(() => {
    props = createTestProps(propsObj);
    component = (
      <AppProvider>
        <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
          <UserListItem {...props} />
        </ThemeProvider>
      </AppProvider>
    );
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
    component = (
      <AppProvider>
        <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
          <UserListItem {...props} />
        </ThemeProvider>
      </AppProvider>
    );
    testingLib = render(component);
  });

  afterAll(() => {
    cleanup();
  });

  it('should fireEvent when peer image is pressed', () => {
    act(() => {
      fireEvent.press(testingLib.getByTestId('PRESS_ID'));
    });
    expect(cnt).toEqual(1);
  });
});
