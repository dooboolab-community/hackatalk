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
import Friend from '../Friend';
import { ThemeProvider } from 'styled-components/native';
import { ThemeType } from '../../../types';
import { createTheme } from '../../../theme';
import renderer from 'react-test-renderer';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  createTheme,
};

describe('[Friend] rendering test', () => {
  let component: React.ReactElement;
  beforeEach(() => {
    component = (
      <AppProvider>
        <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
          <Friend />
        </ThemeProvider>
      </AppProvider>
    );
  });

  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Friend] interaction', () => {
  let testingLib: RenderResult;
  let component: React.ReactElement;

  beforeEach(() => {
    component = (
      <AppProvider>
        <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
          <Friend />
        </ThemeProvider>
      </AppProvider>
    );
    testingLib = render(component);
  });

  beforeEach(() => {
    cleanup();
  });

  // TODO
  // it('should dispatch [show-modal] when user is pressed', () => {
  //   const userListItem = testingLib.queryByTestId('USER_ID');
  //   testingLib.debug();
  //   act(() => {
  //     fireEvent.press(userListItem);
  //   });
  // });
});
