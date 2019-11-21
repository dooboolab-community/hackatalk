import 'react-native';

import * as React from 'react';

import { AuthUser, SignInType } from '../../../types';
import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Setting from '../Setting';
import renderer from 'react-test-renderer';

let component: React.ReactElement;
function getEmptyAuthUserWithSignInType(signInType: SignInType): AuthUser {
  return {
    uid: '',
    displayName: '',
    thumbURL: '',
    photoURL: '',
    statusMsg: '',
    friends: [],
    chatrooms: [],
    signedInWith: signInType,
  };
}

function SettingTest(): React.ReactElement {
  const settingProps = createTestProps();
  return (
    <Setting {...settingProps} />
  );
}

describe('[Setting] screen', () => {
  let testingLib: RenderResult;

  beforeEach(() => {
    component = createTestElement(<SettingTest />, undefined, getEmptyAuthUserWithSignInType(SignInType.Email));
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(component);
    expect(rendered.toJSON()).toMatchSnapshot();
    expect(rendered.toJSON()).toBeTruthy();

    rendered.update(
      createTestElement(<SettingTest />, undefined, getEmptyAuthUserWithSignInType(SignInType.Facebook))
    );
    rendered.update(
      createTestElement(<SettingTest />, undefined, getEmptyAuthUserWithSignInType(SignInType.Google))
    );
  });

  describe('interactions', () => {
    beforeEach(() => {
      testingLib = render(component);
    });

    it('should simulate onPress login state item', async () => {
      const btn = testingLib.getByTestId('changePwItem');
      fireEvent.press(btn);
    });
  });

  afterAll(() => {
    cleanup();
  });
});
