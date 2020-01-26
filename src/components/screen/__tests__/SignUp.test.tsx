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

import { MUTATION_SIGN_UP } from '../../../graphql/mutations';
import { MockedProvider } from '@apollo/react-testing';
import SignUp from '../SignUp';
import renderer from 'react-test-renderer';

// eslint-disable-next-line
let props: any;
let component: ReactElement;

const mockSignUpMutation = [
  {
    request: {
      query: MUTATION_SIGN_UP,
      variables: {
        user: {
          email: 'test@email.com',
          name: 'name',
          password: 'testpass12!',
          statusMessage: 'status',
        },
      },
    },
    result: {
      data: {
        signUp: {
          token: 'access token',
        },
      },
    },
  },
];

describe('[SignUp] rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(
      <MockedProvider mocks={mockSignUpMutation} addTypename={false}>
        <SignUp {...props} />
      </MockedProvider>,
    );
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
    component = createTestElement(
      <MockedProvider mocks={mockSignUpMutation} addTypename={false}>
        <SignUp {...props} />
      </MockedProvider>,
    );
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
      component = createTestElement(
        <MockedProvider mocks={mockSignUpMutation} addTypename={false}>
          <SignUp {...props} />
        </MockedProvider>,
      );
      testingLib = render(component);
    });

    describe('check validation', () => {
      beforeAll(() => {
        props = createTestProps();
        component = createTestElement(
          <MockedProvider mocks={mockSignUpMutation} addTypename={false}>
            <SignUp {...props} />
          </MockedProvider>,
        );
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
        fireEvent.changeText(nameInput, '');
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

  it('should call signUp when button has clicked and navigate to MainStack', async () => {
    const emailInput = testingLib.getByTestId('input-email');
    await wait(() => expect(emailInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(emailInput, 'test@email.com');
    });

    const passwordInput = testingLib.getByTestId('input-password');
    await wait(() => expect(passwordInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(passwordInput, 'testpass12!');
    });

    const confirmPasswordInput = testingLib.getByTestId('input-confirm-password');
    await wait(() => expect(confirmPasswordInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(confirmPasswordInput, 'testpass12!');
    });

    const nameInput = testingLib.getByTestId('input-name');
    await wait(() => expect(nameInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(nameInput, 'name');
    });

    const statusInput = testingLib.getByTestId('input-status');
    await wait(() => expect(nameInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(statusInput, 'status');
    });

    const btnSignUp = testingLib.getByTestId('btn-sign-up');
    await wait(() => expect(btnSignUp).toBeTruthy());

    act(() => {
      fireEvent.press(btnSignUp);
    });

    await act(() => wait());
    expect(props.navigation.resetRoot).toHaveBeenCalledTimes(1);
  });

  it('should call signUp when the button has clicked and check whether it catches error', async () => {
    props = createTestProps({
      navigation: null,
    });
    component = createTestElement(
      <MockedProvider mocks={mockSignUpMutation} addTypename={false}>
        <SignUp {...props} />
      </MockedProvider>,
    );
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

    act(() => {
      fireEvent.press(btnSignUp);
    });

    await act(() => wait());
    expect(props.navigation).toBeNull();
  });

  afterAll((done) => {
    cleanup();
    done();
  });
});
