import * as React from 'react';

import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
  waitForElement,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import ChangePw from '../ChangePw';

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
    const component = createTestElement(<ChangePw {...props} />);
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

      const inputNewPw = testingLib.getByTestId('new-pw-input');
      await waitForElement(() => inputNewPw);
      expect(inputNewPw).toBeTruthy();

      const inputValidation = testingLib.getByTestId('input-validation');
      act(() => {
        fireEvent.changeText(inputNewPw, 'test');
      });
      act(() => {
        fireEvent.changeText(inputValidation, 'test1');
      });
      act(() => {
        fireEvent.press(verifyBtn);
      });

      // test after password changed
      act(() => {
        fireEvent.changeText(inputValidation, 'test');
      });
      act(() => {
        fireEvent.press(verifyBtn);
      });

      // expect(mockAlert.alert).toHaveBeenCalled();
      // mockAlert.alert.mock.calls[2][2][0].onPress();
    });
  });

  afterAll(() => {
    cleanup();
  });
});
