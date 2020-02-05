import 'react-native';

import * as React from 'react';

import { AuthType, User } from '../../../types';
import {
  RenderResult,
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
    authType: signInType,
    socialId: '',
  };
}

function SettingTest(): React.ReactElement {
  const settingProps = createTestProps();
  return <Settings {...settingProps} />;
}

describe('[Setting] screen', () => {
  let testingLib: RenderResult;

  beforeEach(() => {
    component = createTestElement(
      <SettingTest />,
      undefined,
      getEmptyAuthUserWithSignInType(AuthType.EMAIL),
    );
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const { baseElement } = render(component);
    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();

    component = createTestElement(
      <SettingTest />,
      undefined,
      getEmptyAuthUserWithSignInType(AuthType.FACEBOOK),
    );
    const { baseElement: baseElement2 } = render(component);
    expect(baseElement2).toBeTruthy();
    expect(baseElement2).toMatchSnapshot();

    component = createTestElement(
      <SettingTest />,
      undefined,
      getEmptyAuthUserWithSignInType(AuthType.GOOGLE),
    );
    const { baseElement: baseElement3 } = render(component);
    expect(baseElement3).toBeTruthy();
    expect(baseElement3).toMatchSnapshot();

    component = createTestElement(
      <SettingTest />,
      undefined,
      getEmptyAuthUserWithSignInType(AuthType.APPLE),
    );
    const { baseElement: baseElement4 } = render(component);
    expect(baseElement4).toBeTruthy();
    expect(baseElement4).toMatchSnapshot();
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
