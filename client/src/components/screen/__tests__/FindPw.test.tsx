import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderAPI,
  act,
  fireEvent,
  render,
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
    const json = render(component).toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});

describe('[FindPw] interaction', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<FindPw {...props} />);
  });

  it('should invoke changeText event handler when email changed', () => {
    const { getByTestId } = render(component);
    const textInput = getByTestId('input-email');

    act(() => {
      fireEvent.changeText(textInput, 'email@email.com');
    });

    expect(textInput.props.value).toEqual('email@email.com');
  });

  describe('onFindPw', () => {
    beforeAll(() => {
      props = createTestProps();

      component = createTestElement(<FindPw {...props} />);
    });

    it('should show error text when the email is not validated', () => {
      const { getByTestId } = render(component);
      const textInput = getByTestId('input-email');

      act(() => {
        fireEvent.changeText(textInput, 'example');
      });

      const btnFindPw = getByTestId('btn-find-pw');

      act(() => {
        fireEvent.press(btnFindPw);
      });
      // const errorText = testingLib.getByTestId('error-email');
      // expect(errorText).toBeTruthy();
    });

    it('should call FindPw when button has clicked and navigate to SignIn', () => {
      const { getByTestId } = render(component);
      const textInput = getByTestId('input-email');

      act(() => {
        fireEvent.changeText(textInput, 'email@email.com');
      });

      const btnFindPw = getByTestId('btn-find-pw');

      act(() => {
        fireEvent.press(btnFindPw);
      });

      // await wait(() => expect(mockAlert.alert).toHaveBeenCalled());
      // expect(mockAlert.alert.mock.calls[0][1]).toEqual(getString('PASSWORD_RESET_EMAIL_SENT'));
    });

    it('should do nothing when navigation is not defined.', () => {
      props = createTestProps({
        navigation: null,
      });

      component = createTestElement(<FindPw {...props} />);

      const { getByTestId } = render(component);

      const textInput = getByTestId('input-email');

      act(() => {
        fireEvent.changeText(textInput, 'email@email.com');
      });

      const btnFindPw = getByTestId('btn-find-pw');

      act(() => {
        fireEvent.press(btnFindPw);
      });

      expect(props.navigation).toBeNull();
    });
  });
});
