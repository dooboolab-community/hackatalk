import 'react-native';

import React, { ReactElement } from 'react';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import { MockPayloadGenerator } from 'relay-test-utils';
import ProfileUpdate from '../ProfileUpdate';
import ProfileUpdateMeQuery from '../../../__generated__/ProfileUpdateMeQuery.graphql';
import { environment } from '../../../providers';

const component = createTestElement(
  <ProfileUpdate {...createTestProps()} />,
);

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
  it('renders as expected', () => {
    const mockResolver = {
      Profile: () => ({
        id: 'id',
        email: 'email',
        name: 'name',
        nickname: 'nickname',
        statusMessage: '',
        verified: true,
      }),
    };

    environment.mock.queueOperationResolver(
      (operation) => MockPayloadGenerator.generate(operation, mockResolver),
    );

    const json = render(component).toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});

describe('[ProfileUpdate] interaction', () => {
  it('should change nickname', async () => {
    const { getByTestId } = render(component);
    const inputStatus = getByTestId('input-nickname');

    await waitFor(() => expect(inputStatus).toBeTruthy());

    fireEvent.changeText(inputStatus, 'nickname');

    expect(inputStatus.props.value).toEqual('nickname');
  });

  it('should change name', async () => {
    const { getByTestId } = render(component);
    const inputName = getByTestId('input-name');

    await waitFor(() => expect(inputName).toBeTruthy());

    fireEvent.changeText(inputName, 'name');

    expect(inputName.props.value).toEqual('name');
  });

  it('should change status text', async () => {
    const { getByTestId } = render(component);
    const inputStatus = getByTestId('input-status');

    await waitFor(() => expect(inputStatus).toBeTruthy());

    fireEvent.changeText(inputStatus, 'status');

    expect(inputStatus.props.value).toEqual('status');
  });

  it('should call updateProfile when update button pressed', async () => {
    const { getByTestId } = render(component);
    const updateButton = getByTestId('button-update');

    await waitFor(() => expect(updateButton).toBeTruthy());

    fireEvent.press(updateButton);

    const operation = environment.mock.getMostRecentOperation();

    environment.mock.resolve(
      operation,
      MockPayloadGenerator.generate(operation),
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
