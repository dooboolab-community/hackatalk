import 'react-native';

import React, { ReactElement } from 'react';
import { RenderResult, act, fireEvent, render, waitForElement } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Screen from '../ChannelCreate';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderResult;

describe('Rendering', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Screen {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const { baseElement } = testingLib;
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('Interaction', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Screen {...props} />);
    testingLib = render(component);
  });

  it('should change search text', () => {
    const searchInput = testingLib.getByTestId('text-input');
    act(() => {
      fireEvent.changeText(searchInput, 'test search');
    });
    expect(searchInput.props.value).toEqual('test search');
  });

  it('should press userListItem and then remove friend', async () => {
    const userListItem0 = testingLib.getByTestId('user-list-item0');
    act(() => {
      fireEvent.press(userListItem0);
    });

    const removeItem0 = testingLib.getByTestId('remove-0');
    await waitForElement(() => removeItem0);
    act(() => {
      fireEvent.press(removeItem0);
    });
  });

  // it('should press done button', () => {
  //   const touchDone = testingLib.getByTestId('touch-done');
  //   act(() => {
  //     fireEvent.press(touchDone);
  //   });
  // });

  // it('should press error button', () => {
  //   const btnError = testingLib.getByTestId('btn-error');
  //   act(() => {
  //     fireEvent.press(btnError);
  //   });
  // });
});
