import * as React from 'react';

import ChangePw, { ChangePwHeaderOptions } from '../ChangePw';
import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
  wait,
  waitForElement,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import { act } from 'react-test-renderer';

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
      const pwInput = testingLib.getByTestId('currentPwTextInput');
      const verifyBtn = testingLib.getByTestId('checkCurrentPwBtn');
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

      const newPwTextInput = testingLib.getByTestId('newPwTextInput');
      await waitForElement(() => newPwTextInput);
      expect(newPwTextInput).toBeTruthy();

      const newPwInput = testingLib.getByTestId('newPwTextInput');
      const newPwInputCheck = testingLib.getByTestId('validationWordTextInput');
      act(() => {
        fireEvent.changeText(newPwInput, 'test');
      });
      act(() => {
        fireEvent.changeText(newPwInputCheck, 'test1');
      });
      act(() => {
        fireEvent.press(verifyBtn);
      });

      // test after password changed
      act(() => {
        fireEvent.changeText(newPwInputCheck, 'test');
      });
      act(() => {
        fireEvent.press(verifyBtn);
      });

      expect(mockAlert.alert).toHaveBeenCalled();
      mockAlert.alert.mock.calls[2][2][0].onPress();
    });
  });

  afterAll(() => {
    cleanup();
  });
});

describe('[ChangePwHeader] component', () => {
  const props = createTestProps();
  const options = ChangePwHeaderOptions();
  const Header = options.header;
  const component = createTestElement(<Header {...props} />);

  it('renders without crashing', () => {
    const renderedHeader = render(component);
    expect(renderedHeader.asJSON()).toMatchSnapshot();
  });

  it('shoud call naviagation.pop when close button clicked', () => {
    const renderedHeader = render(component);
    const closeBtn = renderedHeader.getByTestId('closeBtn');
    act(() => {
      fireEvent.press(closeBtn);
    });
    expect(props.navigation.goBack).toBeCalled();
  });
});
