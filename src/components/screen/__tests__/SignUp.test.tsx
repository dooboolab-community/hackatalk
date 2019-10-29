import 'react-native';

import * as React from 'react';

import {
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

beforeEach(() => {
  props = createTestProps({
    screenProps: { changeTheme: jest.fn() },
  });
  component = <SignUp {...props} />;
  testingLib = render(component);
});

describe('[SignUp] screen', () => {
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
    expect(formInstance.props.formik.values).toEqual({ email: '', password1: '', password2: '', name: '', status: '' });
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
    it('should simulate onPress', () => {
      const signUpFormInputObj = [{
        label: 'Email',
        value: 'test@test.com',
      }, {
        label: 'Password1',
        value: 'testPassword',
      }, {
        label: 'Password2',
        value: 'testPassword',
      }, {
        label: 'Name',
        value: 'testName',
      }, {
        label: 'Status',
        value: 'testStatus',
      }];
      const { getByTestId, getByPlaceholderText } = testingLib;

      signUpFormInputObj.forEach(({ label, value }) => {
        const input = getByPlaceholderText(label);
        fireEvent.changeText(input, value);
        expect(input.props.value).toBe(value);
      });

      const formInstance = getByTestId('formTest');
      expect(formInstance.props.formik.isValid).toBeTruthy();
      const btnInstance = getByTestId('btnSignUpConfirm');
      fireEvent.press(btnInstance);
      expect(formInstance.props.formik.submitCount).toBe(1);
    });
  });
});
