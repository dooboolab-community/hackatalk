import * as AppleAuthentication from 'expo-apple-authentication';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
  wait,
  waitForElement,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import AsyncStorage from '@react-native-community/async-storage';
import AuthContext from '../../../providers/AuthProvider';
import { FetchMock } from 'jest-fetch-mock';
import { MockPayloadGenerator } from 'relay-test-utils';
import SignIn from '../SignIn';
import { ThemeType } from '@dooboo-ui/theme';
import { environment } from '../../../providers';

const fetchMock = fetch as FetchMock;

fetchMock.mockResponse(JSON.stringify({ id: 1 }));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderResult;

describe('[SignIn] rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(
      <SignIn {...props}/>,
    );
  });

  it('should render without crashing', async () => {
    component = createTestElement(
      <SignIn {...props}/>,
    );
    testingLib = render(component);

    expect(testingLib.baseElement).toMatchSnapshot();
  });

  it('should render [Dark] mode without crashing', () => {
    component = createTestElement(
      <SignIn {...props}/>,
      ThemeType.DARK,
    );
    testingLib = render(component);
    expect(testingLib.baseElement).toBeTruthy();
    // expect(testingLib.baseElement).toMatchSnapshot();
  });
});

describe('[SignIn] interaction', () => {
  beforeAll(() => {
    props = createTestProps();
    component = createTestElement(
      <SignIn {...props}/>,
    );
    testingLib = render(component);
  });

  it('should change theme when icon is pressed', async () => {
    const themeTouch = testingLib.getByTestId('theme-test');

    await waitForElement(() => themeTouch);

    act(() => {
      fireEvent.press(themeTouch);
    });
  });

  it('should invoke changeText event handler when email changed ', async () => {
    const textInput = testingLib.getByTestId('input-email');
    await waitForElement(() => textInput);

    act(() => {
      fireEvent.changeText(textInput, 'email@email.com');
    });

    expect(textInput.props.value).toEqual('email@email.com');
  });

  it('should invoke changeText event handler when password changed ', async () => {
    testingLib = render(component);
    const textInput = testingLib.getByTestId('input-password');
    await waitForElement(() => textInput);

    act(() => {
      fireEvent.changeText(textInput, 'pw test');
    });
    expect(textInput.props.value).toEqual('pw test');
  });

  it('should simulate signUp button has clicked', async () => {
    const btnSignUp = testingLib.getByTestId('btn-sign-up');
    await waitForElement(() => btnSignUp);
    act(() => {
      fireEvent.press(btnSignUp);
    });
    expect(props.navigation.navigate).toHaveBeenCalledWith('SignUp');
  });

  it('should navigate to [FindPw] when button has pressed', async () => {
    const findPwBtn = testingLib.getByTestId('btn-find-pw');
    await waitForElement(() => findPwBtn);
    act(() => {
      fireEvent.press(findPwBtn);
    });
    expect(props.navigation.navigate).toHaveBeenCalledWith('FindPw');
  });

  it('should navigate to [WebView] when terms has been pressed', async () => {
    const btnTerms = testingLib.getByTestId('btn-terms');
    await waitForElement(() => btnTerms);
    act(() => {
      fireEvent.press(btnTerms);
    });
    expect(props.navigation.navigate).toHaveBeenCalledWith('WebView', { uri: 'https://dooboolab.com/termsofservice' });
  });

  it('should navigate to [WebView] when terms has been pressed', async () => {
    const btnPrivary = testingLib.getByTestId('btn-privacy');
    await waitForElement(() => btnPrivary);
    act(() => {
      fireEvent.press(btnPrivary);
    });
    expect(props.navigation.navigate).toHaveBeenCalledWith('WebView', { uri: 'https://dooboolab.com/privacyandpolicy' });
  });

  describe('onSignIn', () => {
    beforeAll(() => {
      testingLib = render(component);
    });

    it('should call signIn when button has clicked and ask to validate email', async () => {
      const btnSignIn = testingLib.getByTestId('btn-sign-in');
      await waitForElement(() => btnSignIn);

      act(() => {
        fireEvent.press(btnSignIn);
      });

      const errorText = testingLib.getByTestId('error-email');
      await act(() => wait());
      expect(errorText).toBeTruthy();
    });

    it('should call signIn when button has clicked and ask to validate password', async () => {
      const textInput = testingLib.getByTestId('input-email');
      await waitForElement(() => textInput);

      act(() => {
        fireEvent.changeText(textInput, 'email@email.com');
      });

      const btnSignIn = testingLib.getByTestId('btn-sign-in');
      await waitForElement(() => btnSignIn);
      act(() => {
        fireEvent.press(btnSignIn);
      });
      const errorText = testingLib.getByTestId('error-password');
      await act(() => wait());
      expect(errorText).toBeTruthy();
    });

    it('should call signIn when button has clicked and navigation switches to [MainStack]', async () => {
      jest.spyOn(AsyncStorage, 'setItem').mockImplementation(jest.fn());
      jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementation(() => ({
          state: {
            user: undefined,
          },
          setUser: jest.fn().mockReturnValue({
            id: 'userId',
            email: 'email@email.com',
            nickname: 'nickname',
            statusMessage: 'status',
          }),
        }));

      const textInput = testingLib.getByTestId('input-email');
      await waitForElement(() => textInput);

      act(() => {
        fireEvent.changeText(textInput, 'test@email.com');
      });

      const passwordInput = testingLib.getByTestId('input-password');
      await waitForElement(() => passwordInput);

      act(() => {
        fireEvent.changeText(passwordInput, 'password');
      });

      const btnSignIn = testingLib.getByTestId('btn-sign-in');
      await waitForElement(() => btnSignIn);

      act(() => {
        fireEvent.press(btnSignIn);
      });

      const operation = environment.mock.getMostRecentOperation();
      environment.mock.resolve(
        operation,
        MockPayloadGenerator.generate(operation),
      );
    });

    it('should call signIn with invalid params and  check whether it catches error', async () => {
      props = createTestProps({
        navigation: null,
      });
      component = createTestElement(
        <SignIn {...props}/>,
      );
      testingLib = render(component);

      const textInput = testingLib.getByTestId('input-email');
      await wait(() => expect(textInput).toBeTruthy());

      act(() => {
        fireEvent.changeText(textInput, 'invalid@email.com');
      });

      const passwordInput = testingLib.getByTestId('input-password');
      await wait(() => expect(passwordInput).toBeTruthy());

      act(() => {
        fireEvent.changeText(passwordInput, 'password');
      });

      const btnSignIn = testingLib.getByTestId('btn-sign-in');
      await wait(() => expect(btnSignIn).toBeTruthy());

      act(() => {
        fireEvent.press(btnSignIn);
      });

      environment.mock.rejectMostRecentOperation(new Error('Uh-oh'));
    });

    it('should call signIn with and get `!user.verified`', async () => {
      jest.spyOn(AsyncStorage, 'setItem').mockImplementation(jest.fn());
      jest
        .spyOn(AuthContext, 'useAuthContext')
        .mockImplementation(() => ({
          state: {
            user: undefined,
          },
          setUser: jest.fn().mockReturnValue({
            id: 'userId',
            email: 'email@email.com',
            nickname: 'nickname',
            statusMessage: 'status',
          }),
        }));

      const textInput = testingLib.getByTestId('input-email');
      await waitForElement(() => textInput);

      act(() => {
        fireEvent.changeText(textInput, 'test@email.com');
      });

      const passwordInput = testingLib.getByTestId('input-password');
      await waitForElement(() => passwordInput);

      act(() => {
        fireEvent.changeText(passwordInput, 'password');
      });

      const btnSignIn = testingLib.getByTestId('btn-sign-in');
      await waitForElement(() => btnSignIn);

      act(() => {
        fireEvent.press(btnSignIn);
      });

      // const userMock = mockSignInEmail[0].newData;
      // await wait(() => expect(userMock).toHaveBeenCalled());
    });
  });

  it('should call Apple signin when pressing button', async () => {
    const btnApple = testingLib.getByTestId('btn-apple');

    await act(async () => {
      await wait(() => expect(btnApple).toBeTruthy());
      fireEvent.press(btnApple);
    });
  });

  afterAll((done) => {
    cleanup();
    done();
  });
});

describe('Apple SignIn', () => {
  let testingLib: RenderResult;

  beforeAll(() => {
    props = createTestProps();
    component = createTestElement(
      <SignIn {...props}/>,
    );
    testingLib = render(component);
  });

  afterAll((done) => {
    cleanup();
    done();
  });

  it('should Apple auth available', async () => {
    return expect(AppleAuthentication.isAvailableAsync()).resolves.toBeTruthy();
  });

  it('should Apple auth unavailable', async () => {
    jest.spyOn(AppleAuthentication, 'isAvailableAsync').mockImplementation(
      () => Promise.resolve(false),
    );
    return expect(AppleAuthentication.isAvailableAsync()).resolves.toBeFalsy();
  });

  it('should signin with Apple when [btn-apple] has pressed', async () => {
    testingLib = render(component);

    const btnApple = testingLib.queryByTestId('btn-apple');
    await wait(() => expect(btnApple).toBeTruthy());

    act(() => {
      fireEvent.press(btnApple);
    });

    return expect(AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      ],
    })).resolves.toMatchObject<AppleAuthentication.AppleAuthenticationCredential>({
      user: 'uniqueUserId',
      identityToken: 'identityToken',
      realUserStatus: 1,
      authorizationCode: 'authorizationCode',
      fullName:
        {
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

  // it('should cancel signin with apple', async () => {
  //   jest.spyOn(AppleAuthentication, 'signInAsync').mockImplementation(
  //     () =>
  //       new Promise((resolve, reject): void => {
  //         const error = {
  //           code: 'ERR_CANCELED',
  //         };
  //         reject(error);
  //       }),
  //   );

  //   const btnApple = testingLib.queryByTestId('btn-apple');
  //   await wait(() => expect(btnApple).toBeTruthy());

  //   act(() => {
  //     fireEvent.press(btnApple);
  //   });

  //   await act(() => wait());

  //   await expect(AppleAuthentication.signInAsync({
  //     requestedScopes: [
  //       AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //       AppleAuthentication.AppleAuthenticationScope.EMAIL,
  //     ],
  //   })).rejects.toEqual({
  //     code: 'ERR_CANCELED',
  //   });
  // });

  // it('should catch signin with apple error', async () => {
  //   jest.spyOn(AppleAuthentication, 'signInAsync').mockImplementation(
  //     () =>
  //       new Promise((resolve, reject): void => {
  //         /**
  //          * ## Error Codes
  //          * - ERR_APPLE_AUTHENTICATION_CREDENTIAL,
  //          * - ERR_APPLE_AUTHENTICATION_INVALID_SCOPE,
  //          * - ERR_APPLE_AUTHENTICATION_REQUEST_FAILED,
  //          * - ERR_APPLE_AUTHENTICATION_UNAVAILABLE,
  //          * - ERR_CANCELED
  //          */
  //         const error = {
  //           code: 'ERR_APPLE_AUTHENTICATION_CREDENTIAL',
  //         };
  //         reject(error);
  //       }),
  //   );

  //   const btnApple = testingLib.queryByTestId('btn-apple');
  //   await wait(() => expect(btnApple).toBeTruthy());

  //   act(() => {
  //     fireEvent.press(btnApple);
  //   });

  //   await act(() => wait());

  //   return expect(AppleAuthentication.signInAsync({
  //     requestedScopes: [
  //       AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //       AppleAuthentication.AppleAuthenticationScope.EMAIL,
  //     ],
  //   })).rejects.not.toBeNull();
  // });
});
