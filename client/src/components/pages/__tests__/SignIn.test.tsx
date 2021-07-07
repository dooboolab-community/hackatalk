import * as AppleAuthentication from 'expo-apple-authentication';

import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../../providers/AuthProvider';
import {FetchMock} from 'jest-fetch-mock';
import React from 'react';
import SignIn from '../SignIn';
import {createMockEnvironment} from 'relay-test-utils';
import mockReactNavigation from '@react-navigation/core';

const fetchMock = fetch as FetchMock;

fetchMock.mockResponse(JSON.stringify({id: 1}));

const mockNavigation = createMockNavigation();

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
}));

jest.mock('../../../components/pages/SignIn/SocialSignInButton', () => 'test');

describe('[SignIn] rendering test', () => {
  it('should render without crashing', async () => {
    const component = createTestElement(<SignIn />);
    const screen = render(component);

    const json = screen.toJSON();

    expect(json).toMatchSnapshot();
  });

  it('should render [Dark] mode without crashing', () => {
    const component = createTestElement(<SignIn />, {
      themeType: 'dark',
    });

    const screen = render(component);

    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});

describe('[SignIn] interaction', () => {
  it('should change theme when icon is pressed', async () => {
    const component = createTestElement(<SignIn />);
    const screen = render(component);
    const themeTouch = screen.getByTestId('theme-test');

    fireEvent.press(themeTouch);
  });

  it('should invoke changeText event handler when email changed ', async () => {
    const component = createTestElement(<SignIn />);
    const screen = render(component);
    const textInput = screen.getByTestId('input-email');

    fireEvent.changeText(textInput, 'email@email.com');

    expect(textInput.props.value).toEqual('email@email.com');
  });

  it('should invoke changeText event handler when password changed ', async () => {
    const component = createTestElement(<SignIn />);
    const screen = render(component);

    const textInput = screen.getByTestId('input-password');

    fireEvent.changeText(textInput, 'pw test');

    expect(textInput.props.value).toEqual('pw test');
  });

  it('should simulate signUp button has clicked', async () => {
    const component = createTestElement(<SignIn />);
    const screen = render(component);
    const btnSignUp = screen.getByTestId('btn-sign-up');

    fireEvent.press(btnSignUp);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('SignUp');
  });

  it('should navigate to [FindPw] when button has pressed', async () => {
    const component = createTestElement(<SignIn />);
    const screen = render(component);
    const findPwBtn = screen.getByTestId('btn-find-pw');

    fireEvent.press(findPwBtn);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('FindPw');
  });

  it('should navigate to [WebView] when terms has been pressed', async () => {
    const component = createTestElement(<SignIn />);
    const screen = render(component);
    const btnTerms = screen.getByTestId('btn-terms');

    fireEvent.press(btnTerms);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('WebView', {
      uri: 'https://legacy.dooboolab.com/termsofservice',
    });
  });

  it('should navigate to [WebView] when terms has been pressed again', async () => {
    const component = createTestElement(<SignIn />);
    const screen = render(component);
    const btnPrivary = screen.getByTestId('btn-privacy');

    fireEvent.press(btnPrivary);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('WebView', {
      uri: 'https://legacy.dooboolab.com/privacyandpolicy',
    });
  });

  describe('onSignIn', () => {
    it('should call signIn when button has clicked and navigation switches to [MainStack]', async () => {
      const mockEnvironment = createMockEnvironment();

      const component = createTestElement(<SignIn />, {
        environment: mockEnvironment,
      });

      const screen = render(component);

      jest.spyOn(AsyncStorage, 'setItem').mockImplementation(jest.fn());

      jest
        .spyOn(AsyncStorage, 'getItem')
        .mockImplementation(jest.fn().mockResolvedValue(JSON.stringify(true)));

      jest.spyOn(AuthContext, 'useAuthContext').mockImplementation(() => ({
        user: null,
        setUser: jest.fn().mockReturnValue({
          id: 'userId',
          email: 'email@email.com',
          verified: true,
          profile: {
            socialId: '',
            authType: 'email',
          },
        }),
        signOutAsync: jest.fn(),
        loadMeQuery: jest.fn(),
      }));

      const textInput = screen.getByTestId('input-email');

      fireEvent.changeText(textInput, 'test@email.com');

      const passwordInput = screen.getByTestId('input-password');

      fireEvent.changeText(passwordInput, 'password');

      const btnSignIn = screen.getByTestId('btn-sign-in');

      fireEvent.press(btnSignIn);

      const operation = await waitFor(() =>
        mockEnvironment.mock.getMostRecentOperation(),
      );

      expect(operation).toBeTruthy();
    });

    it('should call signIn with invalid params and  check whether it catches error', async () => {
      const mockEnvironment = createMockEnvironment();

      const component = createTestElement(<SignIn />, {
        environment: mockEnvironment,
      });

      const screen = render(component);

      const textInput = screen.getByTestId('input-email');

      fireEvent.changeText(textInput, 'invalid@email.com');

      const passwordInput = screen.getByTestId('input-password');

      fireEvent.changeText(passwordInput, 'password');

      const btnSignIn = screen.getByTestId('btn-sign-in');

      fireEvent.press(btnSignIn);

      const operation = await waitFor(() =>
        mockEnvironment.mock.getMostRecentOperation(),
      );

      act(() => {
        mockEnvironment.mock.reject(operation, new Error('Uh-oh'));
      });

      // TODO: Test what happens after rejected operation.
    });
  });

  //   it('should call Apple signin when pressing button', async () => {
  //     const mockEnvironment = createMockEnvironment();
  //     const generatorSpy = jest.spyOn(MockPayloadGenerator, 'generate');

  //     const component = createTestElement(<SignIn />, {
  //       environment: mockEnvironment,
  //     });

  //     const screen = render(component);
  //     const btnApple = screen.getByTestId('btn-apple');

  //     fireEvent.press(btnApple);

  //     await waitFor(() => {
  //       mockEnvironment.mock.resolveMostRecentOperation((operation) =>
  //         MockPayloadGenerator.generate(operation),
  //       );
  //     });

  //     expect(generatorSpy).toHaveBeenCalledTimes(1);
  //   });
});

describe('Apple SignIn', () => {
  it('should Apple auth available', async () => {
    return expect(AppleAuthentication.isAvailableAsync()).resolves.toBeTruthy();
  });

  it('should signin with Apple when [btn-apple] has pressed', async () => {
    const component = createTestElement(<SignIn />);
    const screen = render(component);
    const btnApple = screen.getByTestId('btn-apple');

    fireEvent.press(btnApple);

    const signInResult = await waitFor(() =>
      AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      }),
    );

    expect(signInResult).toMatchObject({
      user: 'uniqueUserId',
      identityToken: 'identityToken',
      realUserStatus: 1,
      authorizationCode: 'authorizationCode',
      fullName: {
        namePrefix: null,
        givenName: 'GivenName',
        nameSuffix: null,
        nickname: null,
        familyName: 'FamilyName',
        middleName: null,
      },
      email: 'email@privaterelay.appleid.com',
      state: null,
    });
  });
});
