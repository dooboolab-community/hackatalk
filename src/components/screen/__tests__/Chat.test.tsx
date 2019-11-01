import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  fireEvent,
  render,
} from '../../../../test/test-utils';

import Chat from '../Chat';
import { ThemeProvider } from 'styled-components/native';
import { ThemeType } from '../../../types';
import { createTheme } from '../../../theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const props: any = {
  navigation: {
    navigate: jest.fn(),
  },
  createTheme,
};

const component: ReactElement = (
  <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
    <Chat {...props} />
  </ThemeProvider>
);

describe('[Chat] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Chat] interaction', () => {
  let testingLib: RenderResult;

  beforeAll(() => {
    testingLib = render(component);
  });

  it('should [sendChat] when pressing button', () => {
    let chatBtn = testingLib.getByTestId('btn_chat');
    chatBtn = testingLib.getByTestId('btn_chat');
    fireEvent.press(chatBtn);
  });
});
