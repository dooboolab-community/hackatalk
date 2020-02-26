import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
  wait,
  waitForElement,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import ProfileUpdate from '../ProfileUpdate';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;

jest.mock('@expo/react-native-action-sheet', () => ({
  useActionSheet: (): object => {
    const userPressLaunchCamera = true;
    const BUTTON_INDEX_LAUNCH_CAMERA = 0;
    const BUTTON_INDEX_LAUNCH_IMAGE_LIBLARY = 1;
    return {
      showActionSheetWithOptions: (
        options: object,
        callback: (index: number) => void,
      ): void => {
        if (userPressLaunchCamera) {
          callback(BUTTON_INDEX_LAUNCH_CAMERA);
        }
        callback(BUTTON_INDEX_LAUNCH_IMAGE_LIBLARY);
      },
    };
  },
}));

jest.mock('expo-permissions', () => ({
  askAsync: (): { status: string } => ({
    status: 'granted',
  }),
}));

jest.mock('expo-image-picker', () => ({
  launchCameraAsync: (): string => 'photo info',
  launchImageLibraryAsync: (): string => 'photo info',
}));

describe('rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<ProfileUpdate {...props} />);
  });

  it('renders as expected', () => {
    const { baseElement } = render(component);
    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});

describe('interaction', () => {
  let props;
  let component: React.ReactElement;
  let testingLib: RenderResult;

  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<ProfileUpdate {...props} />);
    testingLib = render(component);
  });

  it('should fireEvent when update button pressed', () => {
    act(() => {
      fireEvent.press(testingLib.getByTestId('button-update'));
    });
  });

  it('should change nickname', async () => {
    const inputStatus = testingLib.getByTestId('input-nickname');
    await wait(() => expect(inputStatus).toBeTruthy());
    act(() => {
      fireEvent.changeText(inputStatus, 'nickname');
    });
    expect(inputStatus.props.value).toEqual('nickname');
  });

  it('should change name', async () => {
    const inputName = testingLib.getByTestId('input-name');
    await wait(() => expect(inputName).toBeTruthy());

    act(() => {
      fireEvent.changeText(inputName, 'name');
    });
    expect(inputName.props.value).toEqual('name');
  });

  it('should change status text', async () => {
    const inputStatus = testingLib.getByTestId('input-status');
    await wait(() => expect(inputStatus).toBeTruthy());
    act(() => {
      fireEvent.changeText(inputStatus, 'status');
    });
    expect(inputStatus.props.value).toEqual('status');
  });

  it('should launch camera when user select "Take a picture"', async () => {
    // userPressLaunchCamera = true;
    const profileBtn = await waitForElement(() =>
      testingLib.queryByTestId('button-user-icon'),
    );
    act(() => {
      fireEvent.press(profileBtn);
    });
    await wait();
  });

  it('should open album when user select "Select from Album"', async () => {
    // userPressLaunchCamera = false;
    const profileBtn = await waitForElement(() =>
      testingLib.queryByTestId('button-user-icon'),
    );
    await wait(() => expect(profileBtn).toBeTruthy());
    act(() => {
      fireEvent.press(profileBtn);
    });
    await wait();
  });

  afterAll(() => {
    cleanup();
  });
});
