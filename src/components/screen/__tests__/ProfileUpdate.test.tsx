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
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;

const BUTTON_INDEX_LAUNCH_CAMERA = 0;
const BUTTON_INDEX_LAUNCH_IMAGE_LIBLARY = 1;

let userPressLuanchCamera = true;
jest.mock('@expo/react-native-action-sheet', () => ({
  useActionSheet: (): object => {
    return {
      showActionSheetWithOptions: (
        options: object,
        callback: (index: number) => void,
      ): void => {
        if (userPressLuanchCamera) {
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
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
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

  it('should fireEvent when logout button pressed', () => {
    act(() => {
      fireEvent.press(testingLib.getByTestId('logout_btn'));
    });
    expect(props.navigation.resetRoot).toHaveBeenCalled();
  });

  it('should fireEvent when update button pressed', () => {
    act(() => {
      fireEvent.press(testingLib.getByTestId('update_btn'));
    });
  });

  it('should changeText when display name changed', () => {
    const inputName = testingLib.getByTestId('input_name');
    act(() => {
      fireEvent.changeText(inputName, 'name');
    });
  });

  it('should changeText when status message changed', () => {
    const inputStatus = testingLib.getByTestId('input_status');
    act(() => {
      fireEvent.changeText(inputStatus, 'name');
    });
    expect(inputStatus.props.value).toEqual('name');
  });

  it('should launch camera when user select "Take a picture"', async () => {
    userPressLuanchCamera = true;
    const profileBtn = await waitForElement(() =>
      testingLib.queryByTestId('user_icon_button'),
    );
    act(() => {
      fireEvent.press(profileBtn);
    });
    await wait();
  });

  it('should open album when user select "Select from Album"', async () => {
    userPressLuanchCamera = false;
    const profileBtn = await waitForElement(() =>
      testingLib.queryByTestId('user_icon_button'),
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
