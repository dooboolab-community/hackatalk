import * as AppleAuthentication from 'expo-apple-authentication';
import * as Device from 'expo-device';
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';

import Constants, { AppOwnership } from 'expo-constants';
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

import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AuthContext from '../../../providers/AuthProvider';
import { FetchMock } from 'jest-fetch-mock';
import { MUTATION_SIGN_IN } from '../../../graphql/mutations';
import { MockedProvider } from '@apollo/react-testing';
import SignIn from '../SignIn';
import { ThemeType } from '@dooboo-ui/native-theme';

const fetchMock = fetch as FetchMock;

fetchMock.mockResponse(JSON.stringify({ id: 1 }));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderResult;

const mockSignInEmail = [
  {
    request: {
      query: MUTATION_SIGN_IN,
      variables: {
        email: 'test@email.com',
        password: 'password',
      },
    },
    newData: jest.fn()
      .mockReturnValueOnce({
        data: {
          signInEmail: {
            token: 'access token',
            user: {
              id: 'userId',
              authType: 'email',
              email: 'test@email.com',
              nickname: 'nickname',
              statusMessage: 'status',
              verified: true,
            },
          },
        },
      })
      .mockReturnValueOnce({
        data: {
          signInEmail: undefined,
        },
      })
      .mockReturnValueOnce({
        data: {
          signInEmail: {
            token: 'access token',
            user: {
              id: 'userId',
              authType: 'email',
              email: 'test@email.com',
              nickname: 'nickname',
              statusMessage: 'status',
              verified: false,
            },
          },
        },
      })
    ,
  },
];

jest.mock('expo-constants', () => ({
  ...jest.requireActual('expo-constants'),
  appOwnership: 'expo',
}));

describe('[SignIn] rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(
      <MockedProvider mocks={mockSignInEmail} addTypename={false}>
        <SignIn {...props} />
      </MockedProvider>,
    );
  });

  it('should render without crashing', () => {
    testingLib = render(component);
    expect(testingLib.baseElement).toBeTruthy();
    expect(testingLib.baseElement).toMatchSnapshot();
  });

  it('should render [Dark] mode without crashing', () => {
    component = createTestElement(
      <MockedProvider mocks={mockSignInEmail} addTypename={false}>
        <SignIn {...props} />
      </MockedProvider>,
      ThemeType.DARK,
    );
    testingLib = render(component);
    expect(testingLib.baseElement).toBeTruthy();
    expect(testingLib.baseElement).toMatchSnapshot();
  });

  it('should render tablet mode without crashing', () => {
    component = createTestElement(
      <MockedProvider mocks={mockSignInEmail} addTypename={false}>
        <SignIn {...props} />
      </MockedProvider>,
      ThemeType.DARK,
      Device.DeviceType.TABLET,
    );
    testingLib = render(component);
    expect(testingLib.baseElement).toBeTruthy();
    expect(testingLib.baseElement).toMatchSnapshot();
  });
});

describe('[SignIn] interaction', () => {
  beforeAll(() => {
    props = createTestProps();
    component = createTestElement(
      <MockedProvider mocks={mockSignInEmail} addTypename={false}>
        <SignIn {...props} />
      </MockedProvider>,
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

      const userMock = mockSignInEmail[0].newData;
      await wait(() => expect(userMock).toHaveBeenCalled());
    });

    it('should call signIn when button has clicked and check that signInEmail is undefined', async () => {
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

      const userMock = mockSignInEmail[0].newData;
      await wait(() => expect(userMock).toHaveBeenCalled());
    });

    it('should call signIn with invalid params and  check whether it catches error', async () => {
      props = createTestProps({ navigation: null });
      component = createTestElement(
        <MockedProvider mocks={mockSignInEmail} addTypename={false}>
          <SignIn {...props} />
        </MockedProvider>,
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

      const userMock = mockSignInEmail[0].newData;
      await wait(() => expect(userMock).toHaveBeenCalled());
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

      const userMock = mockSignInEmail[0].newData;
      await wait(() => expect(userMock).toHaveBeenCalled());
    });
  });

  it('should call Apple signin when pressing button', async () => {
    const btnApple = testingLib.getByTestId('btn-apple');
    await wait(() => expect(btnApple).toBeTruthy());

    act(() => {
      fireEvent.press(btnApple);
    });
  });

  afterAll((done) => {
    cleanup();
    done();
  });
});

describe('[SignIn] Facebook Signin', () => {
  let testingLib: RenderResult;

  beforeAll(() => {
    props = createTestProps();
    component = createTestElement(
      <MockedProvider mocks={mockSignInEmail} addTypename={false}>
        <SignIn {...props} />
      </MockedProvider>,
    );
    testingLib = render(component);
  });

  afterAll((done) => {
    cleanup();
    done();
  });

  it('should signin with facebook when [btn-facebook] has pressed', async () => {
    Constants.manifest = {
      facebookAppId: 'faebookAppId',
      bundleUrl: 'bundleUrl',
    };

    testingLib = render(component);

    const btnFacebook = testingLib.queryByTestId('btn-facebook');
    await wait(() => expect(btnFacebook).toBeTruthy());

    act(() => {
      fireEvent.press(btnFacebook);
    });

    expect(Facebook.logInWithReadPermissionsAsync({
      permissions: ['email', 'public_profile'],
    })).resolves.toEqual({
      type: 'success',
      token: 'testToken',
    });

    await wait(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  it('should cancel signin with facebook', async () => {
    Constants.manifest = {
      facebookAppId: 'faebookAppId',
      bundleUrl: 'bundleUrl',
    };

    jest.spyOn(Facebook, 'logInWithReadPermissionsAsync').mockImplementation(
      () =>
        new Promise((resolve): void => {
          const result = {
            type: 'cancel',
          };
          // @ts-ignore
          resolve(result);
        }),
    );

    const btnFacebook = testingLib.queryByTestId('btn-facebook');
    await wait(() => expect(btnFacebook).toBeTruthy());

    act(() => {
      fireEvent.press(btnFacebook);
    });

    await act(() => wait());

    expect(Facebook.logInWithReadPermissionsAsync({
      permissions: ['email', 'public_profile'],
    })).resolves.toEqual({
      type: 'cancel',
    });
  });

  it('should catch sign in with facebook error', async () => {
    Constants.manifest = {
      facebookAppId: 'faebookAppId',
      bundleUrl: 'bundleUrl',
    };

    jest.spyOn(Facebook, 'logInWithReadPermissionsAsync').mockRejectedValue('error');

    const btnFacebook = testingLib.queryByTestId('btn-facebook');
    await wait(() => expect(btnFacebook).toBeTruthy());

    act(() => {
      fireEvent.press(btnFacebook);
    });

    await act(() => wait());

    expect(Facebook.logInWithReadPermissionsAsync({
      permissions: ['email', 'public_profile'],
    })).rejects.toEqual('error');
  });
});

describe('[SignIn] Google Signin', () => {
  // hyochan => below unit test is actually useless
  it('should pass [GoogleSignIn] unit test', async () => {
    await GoogleSignIn.initAsync();
    const ask = await GoogleSignIn.askForPlayServicesAsync();
    const { type, user } = await GoogleSignIn.signInAsync();
    expect(ask).toEqual(true);
    expect(type).toEqual('success');
    expect(user).toEqual({
      auth: {
        clientId: 'test',
        accessToken: 'aabb',
        accessTokenExpirationDate: 1562518153000,
      },
    });
  });

  describe('standalone env', () => {
    let testingLib: RenderResult;

    beforeAll((done) => {
      cleanup();
      done();

      testingLib = render(component);
    });

    it('should signin with Google when ownership is standalone', async () => {
      Constants.appOwnership = AppOwnership.Standalone;
      testingLib = render(component);

      const btnGoogle = testingLib.queryByTestId('btn-google');
      await wait(() => expect(btnGoogle).toBeTruthy());

      act(() => {
        fireEvent.press(btnGoogle);
      });
      await act(() => wait());

      expect(GoogleSignIn.signInAsync()).resolves.toEqual({
        type: 'success',
        user: {
          auth: {
            clientId: 'test',
            accessToken: 'aabb',
            accessTokenExpirationDate: 1562518153000,
          },
        },
      });
    });

    it('should cancel while signing in with expo Google', async () => {
      jest.spyOn(GoogleSignIn, 'signInAsync').mockImplementationOnce(
        (): Promise<GoogleSignIn.GoogleSignInAuthResult> =>
          Promise.resolve({
            type: 'cancel',
          }),
      );

      const btnGoogle = testingLib.queryByTestId('btn-google');
      await wait(() => expect(btnGoogle).toBeTruthy());

      act(() => {
        fireEvent.press(btnGoogle);
      });
      await act(() => wait());
    });

    it('should catch error while signing in with expo Google', async () => {
      jest.spyOn(Alert, 'alert').mockImplementation(() => jest.fn());
      jest
        .spyOn(GoogleSignIn, 'signInAsync')
        .mockImplementationOnce(
          (): Promise<GoogleSignIn.GoogleSignInAuthResult> =>
            Promise.reject(new Error('error')),
        );

      const btnGoogle = testingLib.queryByTestId('btn-google');
      await wait(() => expect(btnGoogle).toBeTruthy());

      act(() => {
        fireEvent.press(btnGoogle);
      });
      await act(() => wait());

      expect(Alert.alert).toHaveBeenCalled();
    });
  });
});
