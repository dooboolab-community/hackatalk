import 'react-native';

import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';
import {fireEvent, render} from '@testing-library/react-native';

import type {AuthStackNavigationProps} from '../../navigations/AuthStackNavigator';
import React from 'react';
import SignUp from '../SignUp';
import {act} from 'react-test-renderer';
import type mockReactNavigation from '@react-navigation/core';

const mockNavigation =
  createMockNavigation<AuthStackNavigationProps<'SignUp'>>();

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
}));

describe('[SignUp] rendering test', () => {
  it('renders as expected', () => {
    const component = createTestElement(<SignUp />);
    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
  });
});

describe('[SignUp] interaction', () => {
  it('should invoke changeText event handler when email changed', async () => {
    const component = createTestElement(<SignUp />);
    const screen = render(component);
    const textInput = screen.getByTestId('input-email');

    fireEvent.changeText(textInput, 'email@email.com');

    expect(textInput.props.value).toEqual('email@email.com');
  });

  it('should invoke changeText event handler when password changed', async () => {
    const component = createTestElement(<SignUp />);
    const screen = render(component);

    const textInput = screen.getByTestId('input-password');

    fireEvent.changeText(textInput, 'pw test');

    expect(textInput.props.value).toEqual('pw test');
  });

  it('should confirm password', async () => {
    const component = createTestElement(<SignUp />);
    const screen = render(component);

    const textInput = screen.getByTestId('input-confirm-password');

    fireEvent.changeText(textInput, 'pw test');

    expect(textInput.props.value).toEqual('pw test');
  });

  it('should invoke changeText event when name changed', async () => {
    const component = createTestElement(<SignUp />);
    const screen = render(component);
    const textInput = screen.getByTestId('input-name');

    fireEvent.changeText(textInput, 'dooboo');

    expect(textInput.props.value).toEqual('dooboo');
  });

  it('should invoke changeText event when status changed', async () => {
    const component = createTestElement(<SignUp />);
    const screen = render(component);
    const textInput = screen.getByTestId('input-status');

    fireEvent.changeText(textInput, 'I am good');

    expect(textInput.props.value).toEqual('I am good');
  });

  it('should call signUp when button has clicked and navigate to MainStack', async () => {
    const mockEnvironment = createMockEnvironment();

    const component = createTestElement(<SignUp />, {
      environment: mockEnvironment,
    });

    const screen = render(component);

    const emailInput = screen.getByTestId('input-email');

    fireEvent.changeText(emailInput, 'test@email.com');

    const passwordInput = screen.getByTestId('input-password');

    fireEvent.changeText(passwordInput, 'testpass12!');

    const confirmPasswordInput = screen.getByTestId('input-confirm-password');

    fireEvent.changeText(confirmPasswordInput, 'testpass12!');

    const nameInput = screen.getByTestId('input-name');

    fireEvent.changeText(nameInput, 'name');

    const statusInput = screen.getByTestId('input-status');

    fireEvent.changeText(statusInput, 'status');

    const btnSignUp = screen.getByTestId('btn-sign-up');

    fireEvent.press(btnSignUp);

    const operation = mockEnvironment.mock.getMostRecentOperation();

    act(() => {
      mockEnvironment.mock.resolve(
        operation,
        MockPayloadGenerator.generate(operation),
      );
    });

    expect(mockNavigation.replace).toHaveBeenCalledWith(
      'VerifyEmail',
      expect.objectContaining({email: expect.any(String)}),
    );
  });

  it('should call signUp when the button has clicked and check whether it catches error', async () => {
    const component = createTestElement(<SignUp />);
    const screen = render(component);

    const emailInput = screen.getByTestId('input-email');

    fireEvent.changeText(emailInput, 'email@email.com');

    const passwordInput = screen.getByTestId('input-password');

    fireEvent.changeText(passwordInput, 'Abc123##');

    const confirmPasswordInput = screen.getByTestId('input-confirm-password');

    fireEvent.changeText(confirmPasswordInput, 'Abc123##');

    const nameInput = screen.getByTestId('input-name');

    fireEvent.changeText(nameInput, 'dooboo');

    const btnSignUp = screen.getByTestId('btn-sign-up');

    fireEvent.press(btnSignUp);
  });
});
