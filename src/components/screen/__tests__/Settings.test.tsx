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
import renderer from 'react-test-renderer';

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
    let rendered = renderer.create(component);
    expect(rendered.toJSON()).toMatchSnapshot();
    expect(rendered.toJSON()).toBeTruthy();

    rendered = renderer.create(
      createTestElement(
        <SettingTest />,
        undefined,
        getEmptyAuthUserWithSignInType(AuthType.FACEBOOK),
      ),
    );
    expect(rendered.toJSON()).toMatchSnapshot();
    expect(rendered.toJSON()).toBeTruthy();

    rendered = renderer.create(
      createTestElement(
        <SettingTest />,
        undefined,
        getEmptyAuthUserWithSignInType(AuthType.GOOGLE),
      ),
    );
    expect(rendered.toJSON()).toMatchSnapshot();

    rendered = renderer.create(
      createTestElement(
        <SettingTest />,
        undefined,
        getEmptyAuthUserWithSignInType(AuthType.APPLE),
      ),
    );
    expect(rendered.toJSON()).toMatchSnapshot();
    expect(rendered.toJSON()).toBeTruthy();
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
