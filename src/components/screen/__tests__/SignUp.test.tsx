import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
  wait,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import SignUp from '../SignUp';
import renderer from 'react-test-renderer';

let props: any;
let component: ReactElement;

describe('[SignUp] rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<SignUp {...props} />);
  });

  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[SignUp] interaction', () => {
  let testingLib: RenderResult;

  beforeAll(() => {
    props = createTestProps();
    component = createTestElement(<SignUp {...props} />);
    testingLib = render(component);
  });

  it('should invoke changeText event handler when email changed', async () => {
    const textInput = testingLib.getByTestId('input-email');
    await wait(() => expect(textInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(textInput, 'email@email.com');
    });

    expect(textInput.props.value).toEqual('email@email.com');
  });

  it('should invoke changeText event handler when password changed', async () => {
    testingLib = render(component);
    const textInput = testingLib.getByTestId('input-password');
    await wait(() => expect(textInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(textInput, 'pw test');
    });
    expect(textInput.props.value).toEqual('pw test');
  });

  it('should confirm password', async () => {
    testingLib = render(component);
    const textInput = testingLib.getByTestId('input-confirm-password');
    await wait(() => expect(textInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(textInput, 'pw test');
    });
    expect(textInput.props.value).toEqual('pw test');
  });

  it('should invoke changeText event when name changed', async () => {
    const textInput = testingLib.getByTestId('input-name');
    await wait(() => expect(textInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(textInput, 'dooboo');
    });

    expect(textInput.props.value).toEqual('dooboo');
  });

  it('should invoke changeText event when status changed', async () => {
    const textInput = testingLib.getByTestId('input-status');
    await wait(() => expect(textInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(textInput, 'I am good');
    });

    expect(textInput.props.value).toEqual('I am good');
  });

  describe('onSignUp', () => {
    beforeAll(() => {
      props = createTestProps();
      component = createTestElement(<SignUp {...props} />);
      testingLib = render(component);
    });

    describe('check validation', () => {
      beforeAll(() => {
        props = createTestProps();
        component = createTestElement(<SignUp {...props} />);
        testingLib = render(component);
      });

      it('should show error text when the email is not validated', async () => {
        const emailInput = testingLib.getByTestId('input-email');
        await wait(() => expect(emailInput).toBeTruthy());
        act(() => {
          fireEvent.changeText(emailInput, 'email@email');
        });

        const passwordInput = testingLib.getByTestId('input-password');
        await wait(() => expect(emailInput).toBeTruthy());
        act(() => {
          fireEvent.changeText(passwordInput, 'Abc123##');
        });

        const confirmPasswordInput = testingLib.getByTestId('input-confirm-password');
        await wait(() => expect(confirmPasswordInput).toBeTruthy());
        act(() => {
          fireEvent.changeText(confirmPasswordInput, 'Abc123##');
        });

        const nameInput = testingLib.getByTestId('input-name');
        await wait(() => expect(nameInput).toBeTruthy());
        act(() => {
          fireEvent.changeText(nameInput, 'dooboo');
        });

        const btnSignUp = testingLib.getByTestId('btn-sign-up');
        await wait(() => expect(btnSignUp).toBeTruthy());
        act(() => {
          fireEvent.press(btnSignUp);
        });

        const errorText = testingLib.getByTestId('error-email');
        await wait(() => expect(errorText).toBeTruthy());
      });

      it('should show error text when the password is not validated', async () => {
        const emailInput = testingLib.getByTestId('input-email');
        await wait(() => expect(emailInput).toBeTruthy());
        act(() => {
          fireEvent.changeText(emailInput, 'email@email.com');
        });

        const passwordInput = testingLib.getByTestId('input-password');
        await wait(() => expect(emailInput).toBeTruthy());
        act(() => {
          fireEvent.changeText(passwordInput, 'Abc');
        });

        const confirmPasswordInput = testingLib.getByTestId('input-confirm-password');
        await wait(() => expect(confirmPasswordInput).toBeTruthy());
        act(() => {
          fireEvent.changeText(confirmPasswordInput, 'Abc');
        });

        const nameInput = testingLib.getByTestId('input-name');
        await wait(() => expect(nameInput).toBeTruthy());
        act(() => {
          fireEvent.changeText(nameInput, 'dooboo');
        });

        const btnSignUp = testingLib.getByTestId('btn-sign-up');
        await wait(() => expect(btnSignUp).toBeTruthy());
        act(() => {
          fireEvent.press(btnSignUp);
        });

        const errorText = testingLib.getByTestId('error-password');
        await wait(() => expect(errorText).toBeTruthy());
      });
    });

    it('should show error text when the name is not validated', async () => {
      const emailInput = testingLib.getByTestId('input-email');
      await wait(() => expect(emailInput).toBeTruthy());
      act(() => {
        fireEvent.changeText(emailInput, 'email@email.com');
      });

      const passwordInput = testingLib.getByTestId('input-password');
      await wait(() => expect(emailInput).toBeTruthy());
      act(() => {
        fireEvent.changeText(passwordInput, 'Abc123##');
      });

      const confirmPasswordInput = testingLib.getByTestId('input-confirm-password');
      await wait(() => expect(confirmPasswordInput).toBeTruthy());
      act(() => {
        fireEvent.changeText(confirmPasswordInput, 'Abc123##');
      });

      const nameInput = testingLib.getByTestId('input-name');
      await wait(() => expect(nameInput).toBeTruthy());
      act(() => {
        fireEvent.changeText(nameInput, 'me');
      });

      const btnSignUp = testingLib.getByTestId('btn-sign-up');
      await wait(() => expect(btnSignUp).toBeTruthy());
      act(() => {
        fireEvent.press(btnSignUp);
      });

      const errorText = testingLib.getByTestId('error-name');
      await wait(() => expect(errorText).toBeTruthy());
    });

    it('should show error text when the password is not confirmed', async () => {
      const emailInput = testingLib.getByTestId('input-email');
      await wait(() => expect(emailInput).toBeTruthy());
      act(() => {
        fireEvent.changeText(emailInput, 'email@email.com');
      });

      const passwordInput = testingLib.getByTestId('input-password');
      await wait(() => expect(emailInput).toBeTruthy());
      act(() => {
        fireEvent.changeText(passwordInput, 'Abc123##');
      });

      const confirmPasswordInput = testingLib.getByTestId('input-confirm-password');
      await wait(() => expect(confirmPasswordInput).toBeTruthy());
      act(() => {
        fireEvent.changeText(confirmPasswordInput, 'Adjdj123??');
      });

      const nameInput = testingLib.getByTestId('input-name');
      await wait(() => expect(nameInput).toBeTruthy());
      act(() => {
        fireEvent.changeText(nameInput, 'dooboo');
      });

      const btnSignUp = testingLib.getByTestId('btn-sign-up');
      await wait(() => expect(btnSignUp).toBeTruthy());
      act(() => {
        fireEvent.press(btnSignUp);
      });

      const errorText = testingLib.getByTestId('error-confirm-password');
      await wait(() => expect(errorText).toBeTruthy());
    });
  });

  it('should call signUp when button has clicked and navigate to SignIn', async () => {
    const emailInput = testingLib.getByTestId('input-email');
    await wait(() => expect(emailInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(emailInput, 'email@email.com');
    });

    const passwordInput = testingLib.getByTestId('input-password');
    await wait(() => expect(passwordInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(passwordInput, 'Abc123##');
    });

    const confirmPasswordInput = testingLib.getByTestId('input-confirm-password');
    await wait(() => expect(confirmPasswordInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(confirmPasswordInput, 'Abc123##');
    });

    const nameInput = testingLib.getByTestId('input-name');
    await wait(() => expect(nameInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(nameInput, 'dooboo');
    });

    const btnSignUp = testingLib.getByTestId('btn-sign-up');
    await wait(() => expect(btnSignUp).toBeTruthy());

    jest.useFakeTimers();
    act(() => {
      fireEvent.press(btnSignUp);
      jest.runAllTimers();
    });

    await act(() => wait());
    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
  });

  it('should do nothing when there is no navigation', async () => {
    props = createTestProps({
      navigation: null,
    });
    component = createTestElement(<SignUp {...props} />);
    testingLib = render(component);

    const emailInput = testingLib.getByTestId('input-email');
    await wait(() => expect(emailInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(emailInput, 'email@email.com');
    });

    const passwordInput = testingLib.getByTestId('input-password');
    await wait(() => expect(passwordInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(passwordInput, 'Abc123##');
    });

    const confirmPasswordInput = testingLib.getByTestId('input-confirm-password');
    await wait(() => expect(confirmPasswordInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(confirmPasswordInput, 'Abc123##');
    });

    const nameInput = testingLib.getByTestId('input-name');
    await wait(() => expect(nameInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(nameInput, 'dooboo');
    });

    const btnSignUp = testingLib.getByTestId('btn-sign-up');
    await wait(() => expect(btnSignUp).toBeTruthy());

    jest.useFakeTimers();
    act(() => {
      fireEvent.press(btnSignUp);
      jest.runAllTimers();
    });

    await act(() => wait());
    expect(props.navigation).toBeNull();
  });

  afterAll((done) => {
    cleanup();
    done();
  });
});
