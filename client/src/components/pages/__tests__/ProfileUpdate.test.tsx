import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import {fireEvent, render} from '@testing-library/react-native';

import ProfileUpdate from '../ProfileUpdate';
import React from 'react';
import type {User} from '../../../types/graphql';
import {act} from 'react-test-renderer';
import {createTestElement} from '../../../../test/testUtils';

jest.mock('@expo/react-native-action-sheet', () => ({
  useActionSheet: (): Record<string, unknown> => {
    const userPressLaunchCamera = true;
    const BUTTON_INDEX_LAUNCH_CAMERA = 0;
    const BUTTON_INDEX_LAUNCH_IMAGE_LIBRARY = 1;

    return {
      showActionSheetWithOptions: (
        options: Record<string, unknown>,
        callback: (index: number) => void,
      ): void => {
        if (userPressLaunchCamera) {
          callback(BUTTON_INDEX_LAUNCH_CAMERA);
        }

        callback(BUTTON_INDEX_LAUNCH_IMAGE_LIBRARY);
      },
    };
  },
}));

jest.mock('expo-image-picker', () => ({
  launchCameraAsync: (): string => 'photo info',
  launchImageLibraryAsync: (): string => 'photo info',
}));

const mockEnvironment = createMockEnvironment();

const generateUser = (_: unknown, generateId: () => number): User => ({
  id: `test-user-${generateId()}`,
  email: 'email',
  name: 'name',
  nickname: 'nickname',
  statusMessage: '',
  verified: true,
});

describe('rendering test', () => {
  it('renders as expected', () => {
    const component = createTestElement(<ProfileUpdate />);
    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
  });
});

describe('[ProfileUpdate] interaction', () => {
  it('should change nickname', async () => {
    const component = createTestElement(<ProfileUpdate />);
    const screen = render(component);
    const inputNickname = screen.getByTestId('input-nickname');

    fireEvent.changeText(inputNickname, 'nickname');

    expect(inputNickname.props.value).toEqual('nickname');
  });

  it('should change name', async () => {
    const component = createTestElement(<ProfileUpdate />);
    const screen = render(component);
    const inputName = screen.getByTestId('input-name');

    fireEvent.changeText(inputName, 'name');

    expect(inputName.props.value).toEqual('name');
  });

  it('should change status text', async () => {
    const component = createTestElement(<ProfileUpdate />);
    const screen = render(component);
    const inputStatus = screen.getByTestId('input-status');

    fireEvent.changeText(inputStatus, 'status');

    expect(inputStatus.props.value).toEqual('status');
  });

  it('should call updateProfile when update button pressed', async () => {
    const component = createTestElement(<ProfileUpdate />, {
      environment: mockEnvironment,
    });

    const screen = render(component);
    const updateButton = screen.getByTestId('button-update');

    fireEvent.press(updateButton);

    const operation = mockEnvironment.mock.getMostRecentOperation();

    act(() => {
      mockEnvironment.mock.resolve(
        operation,
        MockPayloadGenerator.generate(operation, {
          User: generateUser,
        }),
      );
    });

    expect(operation.request.node.operation.name).toEqual(
      'UserUpdateProfileMutation',
    );
  });

  // it('should launch camera when user select "Take a picture"', async () => {
  //   // userPressLaunchCamera = true;
  //   const profileBtn = await waitForElement(() =>
  //     testingLib.queryByTestId('button-user-icon'),
  //   );
  //   await act(() => {
  //     fireEvent.press(profileBtn);
  //     // jest.runAllTimers();
  //   });
  //   await wait();
  // });

  // it('should open album when user select "Select from Album"', async () => {
  //   // userPressLaunchCamera = false;
  //   const profileBtn = await waitForElement(() =>
  //     testingLib.queryByTestId('button-user-icon'),
  //   );
  //   await wait(() => expect(profileBtn).toBeTruthy());
  //   act(() => {
  //     fireEvent.press(profileBtn);
  //     // jest.runAllTimers();
  //   });
  //   await wait();
  // });
});
