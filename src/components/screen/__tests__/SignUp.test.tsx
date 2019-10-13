import 'react-native';

import * as React from 'react';

import {
  QueryByText,
  RenderResult,
  fireEvent,
  render,
  toJSON,
  within,
} from '../../../../test/test-utils';

import SignUp from '../SignUp';
import { getString } from '../../../../STRINGS';

let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

const createTestProps = (obj: object): object => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...obj,
});

describe('[SignUp] screen', () => {
  beforeEach(() => {
    props = createTestProps({
      screenProps: { changeTheme: jest.fn() },
    });
    component = <SignUp {...props} />;
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const { container } = testingLib;
    expect(toJSON(container)).toMatchSnapshot();
  });

  it('should render two testIDs: "formTest" and "btnSignUpConfirm"', () => {
    const { getByTestId } = testingLib;
    const formInstance = getByTestId('formTest');
    const btnInstance = getByTestId('btnSignUpConfirm');
    const { getByText } = within(btnInstance);
    const registerString = getString('REGISTER');
    const btnTextInstance: any = getByText(registerString);
    expect(formInstance).toBeTruthy();
    expect(formInstance.props.formik.values).toEqual({ email: '', password1: '', password2: '' });
    expect(btnInstance).toBeTruthy();
    expect(btnTextInstance).toBeTruthy();
    expect(
      JSON.stringify(toJSON(btnInstance)))
      .toEqual(
        expect.stringContaining(
          JSON.stringify(toJSON(btnTextInstance))
        )
      );
  });

  describe('interactions', () => {
    beforeEach(() => {
      testingLib = render(component);
    });

    it('should simulate onPress', () => {
      const { getByTestId } = testingLib;
      const btnInstance = getByTestId('btnSignUpConfirm');
      const formInstance = getByTestId('formTest');
      fireEvent.press(btnInstance);
      expect(formInstance.props.formik.submitCount).toBe(1);
    });
  });
});
