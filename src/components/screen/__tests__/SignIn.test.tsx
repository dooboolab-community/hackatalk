import * as AppAuth from 'expo-app-auth';
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
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import { Alert } from 'react-native';
import SignIn from '../SignIn';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;

jest.mock('expo-constants', () => ({
  ...jest.requireActual('expo-constants'),
  appOwnership: 'expo',
}));

describe('[SignIn] rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<SignIn {...props} />);
  });

  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[SignIn] interaction', () => {
  let testingLib: RenderResult;

  beforeAll(() => {
    props = createTestProps();
    component = createTestElement(<SignIn {...props} />);
    testingLib = render(component);
  });

  it('should change theme when icon is pressed', async () => {
    const themeTouch = testingLib.getByTestId('theme-test');
    await wait(() => expect(themeTouch).toBeTruthy());

    act(() => {
      fireEvent.press(themeTouch);
    });
  });

  it('should invoke changeText event handler when email changed ', async () => {
    const textInput = testingLib.getByTestId('input-email');
    await wait(() => expect(textInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(textInput, 'email@email.com');
    });

    expect(textInput.props.value).toEqual('email@email.com');
  });

  it('should invoke changeText event handler when password changed ', async () => {
    testingLib = render(component);
    const textInput = testingLib.getByTestId('input-password');
    await wait(() => expect(textInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(textInput, 'pw test');
    });
    expect(textInput.props.value).toEqual('pw test');
  });

  it('should simulate signUp button has clicked', async () => {
    const btnSignUp = testingLib.getByTestId('btn-sign-up');
    await wait(() => expect(btnSignUp).toBeTruthy());
    act(() => {
      fireEvent.press(btnSignUp);
    });
    expect(props.navigation.navigate).toHaveBeenCalledWith('SignUp');
  });

  it('should navigate to [FindPw] when button has pressed', async () => {
    const findPwBtn = testingLib.getByTestId('btn-find-pw');
    await wait(() => expect(findPwBtn).toBeTruthy());
    act(() => {
      fireEvent.press(findPwBtn);
    });
    expect(props.navigation.navigate).toHaveBeenCalledWith('FindPw');
  });

  describe('onSignIn', () => {
    beforeAll(() => {
      props = createTestProps();
      component = createTestElement(<SignIn {...props} />);
      testingLib = render(component);
    });

    it('should call signIn when button has clicked and ask to validate email', async () => {
      const btnSignIn = testingLib.getByTestId('btn-sign-in');

      await wait(() => expect(btnSignIn).toBeTruthy());
      act(() => {
        fireEvent.press(btnSignIn);
      });

      const errorText = testingLib.getByTestId('error-email');
      await act(() => wait());
      expect(errorText).toBeTruthy();
    });

    it('should call signIn when button has clicked and ask to validate password', async () => {
      const textInput = testingLib.getByTestId('input-email');
      await wait(() => expect(textInput).toBeTruthy());

      act(() => {
        fireEvent.changeText(textInput, 'email@email.com');
      });

      const btnSignIn = testingLib.getByTestId('btn-sign-in');
      await wait(() => expect(btnSignIn).toBeTruthy());
      act(() => {
        fireEvent.press(btnSignIn);
      });
      const errorText = testingLib.getByTestId('error-password');
      await act(() => wait());
      expect(errorText).toBeTruthy();
    });

    it('should call signIn when button has clicked and navigation resetRoot', async () => {
      const textInput = testingLib.getByTestId('input-email');
      await wait(() => expect(textInput).toBeTruthy());

      act(() => {
        fireEvent.changeText(textInput, 'email@email.com');
      });

      const passwordInput = testingLib.getByTestId('input-password');
      await wait(() => expect(passwordInput).toBeTruthy());

      act(() => {
        fireEvent.changeText(passwordInput, 'password');
      });

      const btnSignIn = testingLib.getByTestId('btn-sign-in');
      await wait(() => expect(btnSignIn).toBeTruthy());

      jest.useFakeTimers();
      act(() => {
        fireEvent.press(btnSignIn);
        jest.runAllTimers();
      });

      await act(() => wait());
      expect(props.navigation.resetRoot).toHaveBeenCalledTimes(1);
    });

    it('should call signIn when button has clicked and do nothing when there is no navigation', async () => {
      props = createTestProps({
        navigation: null,
      });
      component = createTestElement(<SignIn {...props} />);
      testingLib = render(component);

      const textInput = testingLib.getByTestId('input-email');
      await wait(() => expect(textInput).toBeTruthy());

      act(() => {
        fireEvent.changeText(textInput, 'email@email.com');
      });

      const passwordInput = testingLib.getByTestId('input-password');
      await wait(() => expect(passwordInput).toBeTruthy());

      act(() => {
        fireEvent.changeText(passwordInput, 'password');
      });

      const btnSignIn = testingLib.getByTestId('btn-sign-in');
      await wait(() => expect(btnSignIn).toBeTruthy());

      jest.useFakeTimers();
      act(() => {
        fireEvent.press(btnSignIn);
        jest.runAllTimers();
      });

      await act(() => wait());
      expect(props.navigation).toBeNull();
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
    component = createTestElement(<SignIn {...props} />);
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

  describe('expo env', () => {
    let testingLib: RenderResult;
    jest.spyOn(Alert, 'alert').mockImplementation(() => jest.fn());

    beforeAll(() => {
      props = createTestProps();
      component = createTestElement(<SignIn {...props} />);
      testingLib = render(component);
    });

    it('should signin with [AppAuth] when ownership is expo', async () => {
      Constants.appOwnership = AppOwnership.Expo;
      testingLib = render(component);

      const btnGoogle = testingLib.queryByTestId('btn-google');
      await wait(() => expect(btnGoogle).toBeTruthy());

      act(() => {
        fireEvent.press(btnGoogle);
      });
      await act(() => wait());

      expect(AppAuth.authAsync(null)).resolves.toBe({
        accessToken: 'accessToken',
      });

      expect(Alert.alert).toHaveBeenCalled();
    });

    it('should catch error while signing in with [AppAuth]', async () => {
      jest
        .spyOn(AppAuth, 'authAsync')
        .mockImplementationOnce(
          (): Promise<AppAuth.TokenResponse> =>
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

  describe('standalone env', () => {
    let testingLib: RenderResult;

    beforeAll((done) => {
      cleanup();
      done();

      props = createTestProps();
      component = createTestElement(<SignIn {...props} />);
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

      expect(Alert.alert).toHaveBeenCalled();
    });

    it('should catch error while signing in with expo Google', async () => {
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
