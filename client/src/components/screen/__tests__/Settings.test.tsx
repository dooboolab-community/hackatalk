import 'react-native';

import * as React from 'react';

import { AuthType, User } from '../../../types/graphql';
import {
  RenderAPI,
  act,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import AuthContext from '../../../providers/AuthProvider';
import Settings from '../Settings';

let component: React.ReactElement;

function getEmptyAuthUserWithSignInType(signInType: AuthType): User {
  return {
    id: '',
    nickname: '',
    thumbURL: '',
    photoURL: '',
    statusMessage: '',
    profile: {
      authType: AuthType.Email,
    },
  };
}

function SettingTest(): React.ReactElement {
  const settingProps = createTestProps();

  return <Settings {...settingProps} />;
}

describe('[Setting] screen', () => {
  let testingLib: RenderAPI;

  beforeEach(() => {
    component = createTestElement(
      <SettingTest />,
      undefined,
      undefined,
      getEmptyAuthUserWithSignInType(AuthType.Email),
    );

    testingLib = render(component);

    const json = testingLib.toJSON();

    expect(json).toMatchSnapshot();
  });

  it('renders without crashing with Facebook auth type', () => {
    component = createTestElement(
      <SettingTest />,
      undefined,
      undefined,
      getEmptyAuthUserWithSignInType(AuthType.Facebook),
    );

    testingLib = render(component);

    const json = testingLib.toJSON();

    expect(json).toMatchSnapshot();
  });

  it('should renders without crashing with Google auth type', () => {
    component = createTestElement(
      <SettingTest />,
      undefined,
      undefined,
      getEmptyAuthUserWithSignInType(AuthType.Google),
    );

    testingLib = render(component);

    const json = testingLib.toJSON();

    expect(json).toMatchSnapshot();
  });

  it('should render without crashing with Apple auth type', () => {
    component = createTestElement(
      <SettingTest />,
      undefined,
      undefined,
      getEmptyAuthUserWithSignInType(AuthType.Apple),
    );

    testingLib = render(component);

    const json = testingLib.toJSON();

    expect(json).toMatchSnapshot();
  });

  describe('interactions', () => {
    beforeEach(() => {
      testingLib = render(component);
    });

    it('should simulate onPress login state item', async () => {
      const btn = testingLib.getByTestId('change-pw-item');

      fireEvent.press(btn);
    });

    it('should fireEvent when logout button pressed', () => {
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

      act(() => {
        fireEvent.press(testingLib.getByTestId('button-logout'));
      });
    });
  });

  afterAll(() => {
    cleanup();
  });
});
