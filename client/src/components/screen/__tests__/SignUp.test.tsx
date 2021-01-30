import 'react-native';

import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../../../../test/testUtils';

import {MockPayloadGenerator} from 'relay-test-utils';
import React from 'react';
import SignUp from '../SignUp';
import {environment} from '../../../providers';

const component = createTestElement(<SignUp {...createTestProps()} />);

// const mockSignUpMutation = [
//   {
//     request: {
//       query: MUTATION_SIGN_UP,
//       variables: {
//         user: {
//           email: 'test@email.com',
//           name: 'name',
//           password: 'testpass12!',
//           statusMessage: 'status',
//         },
//       },
//     },
//     result: {
//       data: {
//         signUp: {
//           token: 'access token',
//           user: {
//             id: 'userId',
//             email: 'test@email.com',
//             nickname: 'nickname',
//             statusMessage: 'status',
//             verified: false,
//           },
//         },
//       },
//     },
//   },
// ];

describe('[SignUp] rendering test', () => {
  it('renders as expected', () => {
    const json = render(component).toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});

describe('[SignUp] interaction', () => {
  it('should invoke changeText event handler when email changed', async () => {
    const {getByTestId} = render(component);
    const textInput = getByTestId('input-email');

    await waitFor(() => expect(textInput).toBeTruthy());

    fireEvent.changeText(textInput, 'email@email.com');

    expect(textInput.props.value).toEqual('email@email.com');
  });

  it('should invoke changeText event handler when password changed', async () => {
    const {getByTestId} = render(component);

    const textInput = getByTestId('input-password');

    await waitFor(() => expect(textInput).toBeTruthy());

    fireEvent.changeText(textInput, 'pw test');

    expect(textInput.props.value).toEqual('pw test');
  });

  it('should confirm password', async () => {
    const {getByTestId} = render(component);

    const textInput = getByTestId('input-confirm-password');

    await waitFor(() => expect(textInput).toBeTruthy());

    fireEvent.changeText(textInput, 'pw test');

    expect(textInput.props.value).toEqual('pw test');
  });

  it('should invoke changeText event when name changed', async () => {
    const {getByTestId} = render(component);
    const textInput = getByTestId('input-name');

    await waitFor(() => expect(textInput).toBeTruthy());

    fireEvent.changeText(textInput, 'dooboo');

    expect(textInput.props.value).toEqual('dooboo');
  });

  it('should invoke changeText event when status changed', async () => {
    const {getByTestId} = render(component);
    const textInput = getByTestId('input-status');

    await waitFor(() => expect(textInput).toBeTruthy());

    fireEvent.changeText(textInput, 'I am good');

    expect(textInput.props.value).toEqual('I am good');
  });

  // describe('onSignUp', () => {
  //   describe('check validation', () => {
  //     it('should show error text when the email is not validated', async () => {
  //       const {getByTestId} = render(component);
  //       const emailInput = getByTestId('input-email');

  //       await waitFor(() => expect(emailInput).toBeTruthy());

  //       fireEvent.changeText(emailInput, 'email@email');

  //       const passwordInput = getByTestId('input-password');

  //       await waitFor(() => expect(emailInput).toBeTruthy());

  //       fireEvent.changeText(passwordInput, 'Abc123##');

  //       const confirmPasswordInput = getByTestId('input-confirm-password');

  //       await waitFor(() => expect(confirmPasswordInput).toBeTruthy());

  //       fireEvent.changeText(confirmPasswordInput, 'Abc123##');

  //       const nameInput = getByTestId('input-name');

  //       await waitFor(() => expect(nameInput).toBeTruthy());

  //       fireEvent.changeText(nameInput, 'dooboo');

  //       const btnSignUp = getByTestId('btn-sign-up');

  //       await waitFor(() => expect(btnSignUp).toBeTruthy());

  //       fireEvent.press(btnSignUp);

  //       const errorText = getByTestId('error-email');

  //       await waitFor(() => expect(errorText).toBeTruthy());
  //     });

  //     it('should show error text when the password is not validated', async () => {
  //       const {getByTestId} = render(component);
  //       const emailInput = getByTestId('input-email');

  //       await waitFor(() => expect(emailInput).toBeTruthy());

  //       fireEvent.changeText(emailInput, 'email@email.com');

  //       const passwordInput = getByTestId('input-password');

  //       await waitFor(() => expect(emailInput).toBeTruthy());

  //       fireEvent.changeText(passwordInput, 'Abc');

  //       const confirmPasswordInput = getByTestId('input-confirm-password');

  //       await waitFor(() => expect(confirmPasswordInput).toBeTruthy());

  //       fireEvent.changeText(confirmPasswordInput, 'Abc');

  //       const nameInput = getByTestId('input-name');

  //       await waitFor(() => expect(nameInput).toBeTruthy());

  //       fireEvent.changeText(nameInput, 'dooboo');

  //       const btnSignUp = getByTestId('btn-sign-up');

  //       await waitFor(() => expect(btnSignUp).toBeTruthy());

  //       fireEvent.press(btnSignUp);

  //       const errorText = getByTestId('error-password');

  //       await waitFor(() => expect(errorText).toBeTruthy());
  //     });
  //   });

  //   it('should show error text when the name is not validated', async () => {
  //     const {getByTestId} = render(component);
  //     const emailInput = getByTestId('input-email');

  //     await waitFor(() => expect(emailInput).toBeTruthy());

  //     fireEvent.changeText(emailInput, 'email@email.com');

  //     const passwordInput = getByTestId('input-password');

  //     await waitFor(() => expect(emailInput).toBeTruthy());

  //     fireEvent.changeText(passwordInput, 'Abc123##');

  //     const confirmPasswordInput = getByTestId('input-confirm-password');

  //     await waitFor(() => expect(confirmPasswordInput).toBeTruthy());

  //     fireEvent.changeText(confirmPasswordInput, 'Abc123##');

  //     const nameInput = getByTestId('input-name');

  //     await waitFor(() => expect(nameInput).toBeTruthy());

  //     fireEvent.changeText(nameInput, '');

  //     const btnSignUp = getByTestId('btn-sign-up');

  //     await waitFor(() => expect(btnSignUp).toBeTruthy());

  //     fireEvent.press(btnSignUp);

  //     const errorText = getByTestId('error-name');

  //     await waitFor(() => expect(errorText).toBeTruthy());
  //   });

  //   it('should show error text when the password is not confirmed', async () => {
  //     const {getByTestId} = render(component);
  //     const emailInput = getByTestId('input-email');

  //     await waitFor(() => expect(emailInput).toBeTruthy());

  //     fireEvent.changeText(emailInput, 'email@email.com');

  //     const passwordInput = getByTestId('input-password');

  //     await waitFor(() => expect(emailInput).toBeTruthy());

  //     fireEvent.changeText(passwordInput, 'Abc123##');

  //     const confirmPasswordInput = getByTestId('input-confirm-password');

  //     await waitFor(() => expect(confirmPasswordInput).toBeTruthy());

  //     fireEvent.changeText(confirmPasswordInput, 'Adjdj123??');

  //     const nameInput = getByTestId('input-name');

  //     await waitFor(() => expect(nameInput).toBeTruthy());

  //     fireEvent.changeText(nameInput, 'dooboo');

  //     const btnSignUp = getByTestId('btn-sign-up');

  //     await waitFor(() => expect(btnSignUp).toBeTruthy());

  //     fireEvent.press(btnSignUp);

  //     const errorText = getByTestId('error-confirm-password');

  //     await waitFor(() => expect(errorText).toBeTruthy());
  //   });
  // });

  it('should call signUp when button has clicked and navigate to MainStack', async () => {
    const {getByTestId} = render(component);
    const emailInput = getByTestId('input-email');

    await waitFor(() => expect(emailInput).toBeTruthy());

    fireEvent.changeText(emailInput, 'test@email.com');

    const passwordInput = getByTestId('input-password');

    await waitFor(() => expect(passwordInput).toBeTruthy());

    fireEvent.changeText(passwordInput, 'testpass12!');

    const confirmPasswordInput = getByTestId('input-confirm-password');

    await waitFor(() => expect(confirmPasswordInput).toBeTruthy());

    fireEvent.changeText(confirmPasswordInput, 'testpass12!');

    const nameInput = getByTestId('input-name');

    await waitFor(() => expect(nameInput).toBeTruthy());

    fireEvent.changeText(nameInput, 'name');

    const statusInput = getByTestId('input-status');

    await waitFor(() => expect(nameInput).toBeTruthy());

    fireEvent.changeText(statusInput, 'status');

    const btnSignUp = getByTestId('btn-sign-up');

    await waitFor(() => expect(btnSignUp).toBeTruthy());

    fireEvent.press(btnSignUp);

    const operation = environment.mock.getMostRecentOperation();

    environment.mock.resolve(
      operation,
      MockPayloadGenerator.generate(operation),
    );
    // expect(props.navigation.resetRoot).toHaveBeenCalledTimes(1);
  });

  it('should call signUp when the button has clicked and check whether it catches error', async () => {
    const anotherComponent = createTestElement(
      <SignUp
        {...createTestProps({
          navigation: null,
        })}
      />,
    );

    const {getByTestId} = render(anotherComponent);

    const emailInput = getByTestId('input-email');

    await waitFor(() => expect(emailInput).toBeTruthy());

    fireEvent.changeText(emailInput, 'email@email.com');

    const passwordInput = getByTestId('input-password');

    await waitFor(() => expect(passwordInput).toBeTruthy());

    fireEvent.changeText(passwordInput, 'Abc123##');

    const confirmPasswordInput = getByTestId('input-confirm-password');

    await waitFor(() => expect(confirmPasswordInput).toBeTruthy());

    fireEvent.changeText(confirmPasswordInput, 'Abc123##');

    const nameInput = getByTestId('input-name');

    await waitFor(() => expect(nameInput).toBeTruthy());

    fireEvent.changeText(nameInput, 'dooboo');

    const btnSignUp = getByTestId('btn-sign-up');

    await waitFor(() => expect(btnSignUp).toBeTruthy());

    fireEvent.press(btnSignUp);
  });

  afterAll((done) => {
    cleanup();
    done();
  });
});
