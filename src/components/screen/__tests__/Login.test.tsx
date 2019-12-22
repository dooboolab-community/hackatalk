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
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import { Alert } from 'react-native';
import Button from '../../shared/Button';
import Login from '../Login';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;

jest.mock('expo-constants', () => ({
  ...jest.requireActual('expo-constants'),
  appOwnership: 'expo',
}));

describe('[Login] rendering test', () => {
  jest.spyOn(Alert, 'alert').mockImplementation(() => jest.fn());
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Login {...props} />);
  });

  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Login] interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;
  let testingLib: RenderResult;

  beforeAll(() => {
    rendered = renderer.create(component);
    root = rendered.root;
    testingLib = render(component);
  });

  it('should change theme when icon is pressed', () => {
    const themeTouch = testingLib.getByTestId('themeTest');
    fireEvent.press(themeTouch);
  });

  it('should invoke changeText event handler when email changed ', () => {
    const textInput = testingLib.getByTestId('email_input');
    jest.useFakeTimers();
    jest.runAllTimers();
    fireEvent.changeText(textInput, 'email test');
    expect(textInput.props.value).toEqual('email test');
  });

  it('should invoke changeText event handler when password changed ', () => {
    const textInput = testingLib.getByTestId('pw_input');
    jest.useFakeTimers();
    jest.runAllTimers();
    fireEvent.changeText(textInput, 'pw test');
    expect(textInput.props.value).toEqual('pw test');
  });

  it('should simulate when [goToSignUp] is clicked', () => {
    const btnSignUp = testingLib.getByTestId('btnSignUp');
    act(() => {
      fireEvent.press(btnSignUp);
    });
    expect(props.navigation.navigate).toHaveBeenCalledWith('SignUp');
  });

  it('should simulate when [onLogin] is clicked', () => {
    jest.useFakeTimers();
    const buttons = root.findAllByType(Button);
    act(() => {
      fireEvent.press(testingLib.getByTestId('btnLogin'));
    });

    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(buttons[0].props.isLoading).toEqual(false);
  });

  it('should simulate when [goToForgotPw] is clicked', () => {
    const findPwBtn = testingLib.getByTestId('findPw');
    act(() => {
      fireEvent.press(findPwBtn);
    });
    expect(props.navigation.navigate).toHaveBeenCalledWith('FindPw');
  });

  afterAll((done) => {
    cleanup();
    done();
  });
});

describe('[Login] Facebook Signin', () => {
  let testingLib: RenderResult;

  beforeAll((done) => {
    cleanup();
    done();
  });

  it('should signin with facebook when [btnFacebook] has pressed', async () => {
    Constants.manifest = {
      facebookAppId: 'faebookAppId',
      bundleUrl: 'bundleUrl',
    };

    // expect.assertions(1);
    testingLib = render(component);

    const btnFacebook = testingLib.queryByTestId('btnFacebook');
    act(() => {
      fireEvent.press(btnFacebook);
    });

    expect(Facebook.logInWithReadPermissionsAsync('')).resolves.toEqual({
      type: 'success',
      token: 'testToken',
    });

    const flushPromises = (): Promise<unknown> => new Promise(setImmediate);
    await flushPromises();

    // expect(fetch).toHaveBeenCalledTimes(1);
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
            token: 'testToken',
          };
          resolve(result);
        }),
    );

    testingLib = render(component);

    const btnFacebook = testingLib.queryByTestId('btnFacebook');
    act(() => {
      fireEvent.press(btnFacebook);
    });

    // const flushPromises = (): Promise<unknown> => new Promise(setImmediate);
    // await flushPromises();

    expect(Facebook.logInWithReadPermissionsAsync('')).resolves.toEqual({
      type: 'cancel',
      token: 'testToken',
    });
  });
});

describe('[Login] Google Signin', () => {
  let testingLib: RenderResult;

  // hyochan => below unit test is actually useless
  it('should pass [GoogleSignIn] unit test', async () => {
    testingLib = render(component);

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
    it('should signin with [AppAuth] when ownership is expo', async () => {
      Constants.appOwnership = AppOwnership.Expo;
      testingLib = render(component);

      const btnGoogle = testingLib.queryByTestId('btnGoogle');
      act(() => {
        fireEvent.press(btnGoogle);
      });

      expect(AppAuth.authAsync(null)).resolves.toBe({
        accessToken: 'accessToken',
      });

      const flushPromises = (): Promise<unknown> => new Promise(setImmediate);
      await flushPromises();

      expect(Alert.alert).toHaveBeenCalled();
    });

    it('should catch error while signing in with [AppAuth]', async () => {
      jest
        .spyOn(AppAuth, 'authAsync')
        .mockImplementationOnce(
          (): Promise<AppAuth.TokenResponse> =>
            Promise.reject(new Error('error')),
        );

      const btnGoogle = testingLib.queryByTestId('btnGoogle');
      act(() => {
        fireEvent.press(btnGoogle);
      });

      const flushPromises = (): Promise<unknown> => new Promise(setImmediate);
      await flushPromises();

      expect(Alert.alert).toHaveBeenCalled();
    });
  });

  describe('standalone env', () => {
    beforeAll((done) => {
      cleanup();
      done();
    });

    it('should signin with Google when ownership is standalone', async () => {
      Constants.appOwnership = AppOwnership.Standalone;
      testingLib = render(component);

      const btnGoogle = testingLib.queryByTestId('btnGoogle');
      act(() => {
        fireEvent.press(btnGoogle);
      });

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

      const flushPromises = (): Promise<unknown> => new Promise(setImmediate);
      await flushPromises();
    });

    it('should cancel while signing in with expo Google', async () => {
      jest.spyOn(GoogleSignIn, 'signInAsync').mockImplementationOnce(
        (): Promise<GoogleSignIn.GoogleSignInAuthResult> =>
          Promise.resolve({
            type: 'cancel',
          }),
      );

      const btnGoogle = testingLib.queryByTestId('btnGoogle');
      act(() => {
        fireEvent.press(btnGoogle);
      });

      const flushPromises = (): Promise<unknown> => new Promise(setImmediate);
      await flushPromises();

      expect(Alert.alert).toHaveBeenCalled();
    });

    it('should catch error while signing in with expo Google', async () => {
      jest
        .spyOn(GoogleSignIn, 'signInAsync')
        .mockImplementationOnce(
          (): Promise<GoogleSignIn.GoogleSignInAuthResult> =>
            Promise.reject(new Error('error')),
        );

      const btnGoogle = testingLib.queryByTestId('btnGoogle');
      act(() => {
        fireEvent.press(btnGoogle);
      });

      const flushPromises = (): Promise<unknown> => new Promise(setImmediate);
      await flushPromises();

      expect(Alert.alert).toHaveBeenCalled();
    });
  });
});
