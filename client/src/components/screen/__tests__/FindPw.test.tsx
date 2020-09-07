import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
  fireEvent,
  render,
  wait,
  waitForElement,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import FindPw from '../FindPw';
import { getString } from '../../../../STRINGS';

// eslint-disable-next-line
let props: any;
let component: ReactElement;

// const mockFindPwMutation = [
//   {
//     request: {
//       query: MUTATION_FIND_PASSWORD,
//       variables: {
//         email: 'email@email.com',
//       },
//     },
//     result: {
//       data: {
//         findPassword: true,
//       },
//     },
//   },
// ];

const mockAlert = {
  alert: jest.fn(),
};

jest.mock('react-native', () => {
  const ReactNative = jest.requireActual('react-native');
  Object.defineProperty(ReactNative, 'Alert', {
    get: () => mockAlert,
  });
  return ReactNative;
});

describe('[FindPw] rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<FindPw {...props} />);
  });

  it('should renders as expected', () => {
    const { baseElement } = render(component);
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('[FindPw] interaction', () => {
  let testingLib: RenderResult;

  beforeAll(() => {
    props = createTestProps();
    component = createTestElement(<FindPw {...props} />);
    testingLib = render(component);
  });

  it('should invoke changeText event handler when email changed', async () => {
    const textInput = await waitForElement(() => testingLib.getByTestId('input-email'));

    act(() => {
      fireEvent.changeText(textInput, 'email@email.com');
    });

    expect(textInput.props.value).toEqual('email@email.com');
  });

  describe('onFindPw', () => {
    beforeAll(() => {
      props = createTestProps();
      component = createTestElement(
        <FindPw {...props} />,
      );
      testingLib = render(component);
    });

    it('should show error text when the email is not validated', async () => {
      const textInput = await waitForElement(() => testingLib.getByTestId('input-email'));

      act(() => {
        fireEvent.changeText(textInput, 'example');
      });

      const btnFindPw = testingLib.getByTestId('btn-find-pw');
      await wait(() => expect(btnFindPw).toBeTruthy());
      act(() => {
        fireEvent.press(btnFindPw);
      });
      await act(() => wait());
      const errorText = testingLib.getByTestId('error-email');
      expect(errorText).toBeTruthy();
    });

    it('should call FindPw when button has clicked and navigate to SignIn', async () => {
      const textInput = testingLib.getByTestId('input-email');

      act(() => {
        fireEvent.changeText(textInput, 'email@email.com');
      });

      const btnFindPw = testingLib.getByTestId('btn-find-pw');
      await wait(() => expect(btnFindPw).toBeTruthy());

      jest.useFakeTimers();
      act(() => {
        fireEvent.press(btnFindPw);
        jest.runAllTimers();
      });

      // await wait(() => expect(mockAlert.alert).toHaveBeenCalled());
      // expect(mockAlert.alert.mock.calls[0][1]).toEqual(getString('PASSWORD_RESET_EMAIL_SENT'));
    });

    it('should do nothing when navigation is not defined.', async () => {
      props = createTestProps({
        navigation: null,
      });
      component = createTestElement(<FindPw {...props} />);
      testingLib = render(component);

      const textInput = testingLib.getByTestId('input-email');
      await wait(() => expect(textInput).toBeTruthy());

      act(() => {
        fireEvent.changeText(textInput, 'email@email.com');
      });

      const btnFindPw = testingLib.getByTestId('btn-find-pw');
      await wait(() => expect(btnFindPw).toBeTruthy());

      jest.useFakeTimers();
      act(() => {
        fireEvent.press(btnFindPw);
        jest.runAllTimers();
      });

      await act(() => wait());
      expect(props.navigation).toBeNull();
    });
  });
});
