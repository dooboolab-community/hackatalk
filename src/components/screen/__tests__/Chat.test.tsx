import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../utils/testUtils';

import Chat from '../Chat';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let props: any;
let component: ReactElement;

describe('[Chat] rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Chat {...props} />);
  });

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

  afterAll(() => {
    cleanup();
  });
});
