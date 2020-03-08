import * as React from 'react';

import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
  wait,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import ChangePw from '../ChangePw';
import { MUTATION_CHANGE_PASSWORD } from '../../../graphql/mutations';
import { MockedProvider } from '@apollo/react-testing';
import { getString } from '../../../../STRINGS';

const mockChangePwMutation = [
  {
    request: {
      query: MUTATION_CHANGE_PASSWORD,
      variables: {
        currentPassword: 'currentPassword',
        newPassword: 'newPassword',
      },
    },
    error: new Error('Error occurred'),
  },
  {
    request: {
      query: MUTATION_CHANGE_PASSWORD,
      variables: {
        currentPassword: 'currentPassword',
        newPassword: 'newPassword',
      },
    },
    result: {
      data: {
        changeEmailPassword: true,
      },
    },
  },
];

const mockAlert = {
  alert: jest.fn(),
};

const mockKeyboard = {
  addListener: jest.fn(),
  dismiss: jest.fn(),
};

jest.mock('react-native', () => {
  const ReactNative = jest.requireActual('react-native');
  Object.defineProperty(ReactNative, 'Alert', {
    get: () => mockAlert,
  });
  Object.defineProperty(ReactNative, 'Keyboard', {
    get: () => mockKeyboard,
  });
  return ReactNative;
});

describe('[ChangePw] screen', () => {
  let testingLib: RenderResult;

  beforeEach(() => {
    const props = createTestProps({});
    const component = createTestElement(
      <MockedProvider mocks={mockChangePwMutation}>
        <ChangePw {...props} />
      </MockedProvider>,
    );
    testingLib = render(component);
    mockAlert.alert.mockClear();
  });

  it('renders without crashing', () => {
    expect(testingLib.asJSON()).toMatchSnapshot();
    expect(testingLib.asJSON()).toBeTruthy();
  });

  describe('interactions', () => {
    it('should simulate textChanged', async () => {
      const pwInput = testingLib.getByTestId('input-pw');
      const verifyBtn = testingLib.getByTestId('input-pw');
      act(() => {
        fireEvent.changeText(pwInput, 'left');
      });
      act(() => {
        fireEvent.press(verifyBtn);
      });
      act(() => {
        fireEvent.changeText(pwInput, 'right');
      });
      act(() => {
        fireEvent.press(verifyBtn);
      });

      const keyboardEvents = mockKeyboard.addListener.mock.calls;
      keyboardEvents.forEach(
        async ([eventName, ftn]: [string, (arg?: any) => void]) => {
          switch (eventName) {
            case 'keyboardWillShow':
              act(() => ftn({ endCoordinates: { height: 301 } }));
              break;
            case 'keyboardWillHide':
              act(() => ftn());
              break;
            default:
          }
        },
      );
    });

    it('should alert based on api result', async () => {
      const pwInput = testingLib.getByTestId('input-pw');
      const inputNewPw = testingLib.getByTestId('new-pw-input');
      const inputValidation = testingLib.getByTestId('input-validation');
      const changePwBtn = testingLib.getByTestId('close-current-pw-btn');

      act(() => {
        fireEvent.changeText(pwInput, 'currentPassword');
      });

      act(() => {
        fireEvent.changeText(inputNewPw, 'newPassword');
      });

      act(() => {
        fireEvent.changeText(inputValidation, 'newPassword');
      });

      // api falied
      act(() => { fireEvent.press(changePwBtn); });
      await wait(() => expect(mockAlert.alert).toHaveBeenCalledTimes(1));
      expect(mockAlert.alert.mock.calls[0][1]).toEqual(getString('CHANGE_PASSWORD_IS_FAILED'));

      // api succeeded
      act(() => { fireEvent.press(changePwBtn); });
      await wait(() => expect(mockAlert.alert).toHaveBeenCalledTimes(2));
      expect(mockAlert.alert.mock.calls[1][1]).toEqual(getString('PASSWORD_IS_CHANGED'));
    });
  });

  afterAll(() => {
    cleanup();
  });
});
