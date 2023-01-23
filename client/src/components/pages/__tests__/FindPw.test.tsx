import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';
import {fireEvent, render, waitFor} from '@testing-library/react-native';

import {Alert} from 'react-native';
import FindPw from '../FindPw';
import React from 'react';
import {getString} from '../../../../STRINGS';
import type mockReactNavigation from '@react-navigation/core';

const mockNavigation = createMockNavigation();

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
}));

describe('[FindPw] rendering test', () => {
  it('should renders as expected', () => {
    const component = createTestElement(<FindPw />);
    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
  });
});

describe('[FindPw] interaction', () => {
  it('should invoke changeText event handler when email changed', () => {
    const component = createTestElement(<FindPw />);
    const screen = render(component);
    const textInput = screen.getByTestId('input-email');

    fireEvent.changeText(textInput, 'email@email.com');

    expect(textInput.props.value).toEqual('email@email.com');
  });

  describe('onFindPw', () => {
    it('should show error text when the email is not validated', () => {
      const component = createTestElement(<FindPw />);
      const screen = render(component);
      const textInput = screen.getByTestId('input-email');

      fireEvent.changeText(textInput, 'example');

      const btnFindPw = screen.getByTestId('btn-find-pw');

      fireEvent.press(btnFindPw);

      const errorText = screen.getByText(getString('EMAIL_FORMAT_NOT_VALID'));

      expect(errorText).toBeTruthy();
    });

    it('should show error alert when user does not exists', async () => {
      const mockEnvironment = createMockEnvironment();

      mockEnvironment.mock.queueOperationResolver(
        () => new Error(JSON.stringify({message: 'user does not exists'})),
      );

      const component = createTestElement(<FindPw />, {
        environment: mockEnvironment,
      });
      const screen = render(component);
      const textInput = screen.getByTestId('input-email');
      const email = '11111@geoseong.net';

      fireEvent.changeText(textInput, email);

      const btnFindPw = screen.getByTestId('btn-find-pw');
      const mockAlert = jest.spyOn(Alert, 'alert');

      fireEvent.press(btnFindPw);

      await waitFor(() => expect(mockAlert).toHaveBeenCalled());
    });

    it('should show error alert when email sent failed', async () => {
      const mockEnvironment = createMockEnvironment();

      mockEnvironment.mock.queueOperationResolver(
        () => new Error(JSON.stringify({message: 'mail sent failed'})),
      );

      const component = createTestElement(<FindPw />, {
        environment: mockEnvironment,
      });
      const screen = render(component);
      const textInput = screen.getByTestId('input-email');
      const email = 'hyochan@dooboolab.com';

      fireEvent.changeText(textInput, email);

      const btnFindPw = screen.getByTestId('btn-find-pw');
      const mockAlert = jest.spyOn(Alert, 'alert');

      fireEvent.press(btnFindPw);

      await waitFor(() => expect(mockAlert).toHaveBeenCalled());
    });

    it('should call FindPw when button has clicked and navigate to SignIn', async () => {
      const mockEnvironment = createMockEnvironment();

      mockEnvironment.mock.queueOperationResolver((operation) =>
        MockPayloadGenerator.generate(operation),
      );

      const mockAlert = jest.spyOn(Alert, 'alert');

      const component = createTestElement(<FindPw />, {
        environment: mockEnvironment,
      });

      const screen = render(component);
      const textInput = screen.getByTestId('input-email');

      fireEvent.changeText(textInput, 'email@email.com');

      const btnFindPw = screen.getByTestId('btn-find-pw');

      fireEvent.press(btnFindPw);

      await waitFor(() => expect(mockAlert).toHaveBeenCalled());

      expect(mockAlert).toHaveBeenCalledWith(
        expect.any(String),
        getString('PASSWORD_RESET_EMAIL_SENT'),
      );
    });
  });
});
