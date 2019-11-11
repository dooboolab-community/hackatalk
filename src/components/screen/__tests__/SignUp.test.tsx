import 'react-native';

import * as React from 'react';

import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
  toJSON,
  within,
} from '@testing-library/react-native';
import SignUp, { initialValues } from '../SignUp';
// import { act, renderHook } from '@testing-library/react-hooks';
import { createTestElement, createTestProps } from '../../../utils/testUtils';

import { getString } from '../../../../STRINGS';

// import { useFormContext } from 'react-hook-form';

// jest.mock('react-hook-form');
let props: any;
let component: React.ReactElement;

describe('[SignUp] screen', () => {
  let testingLib: RenderResult;

  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<SignUp {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const { container } = testingLib;
    expect(toJSON(container)).toMatchSnapshot();
  });

  it('should render testIDs: each input and "btnSignUpConfirm"', () => {
    const { getByTestId } = testingLib;
    const btnInstance = getByTestId('btnSignUpConfirm');
    const { getByText } = within(btnInstance);
    const registerString = getString('REGISTER');
    const btnTextInstance: any = getByText(registerString);

    Object.keys(initialValues).map((label: string) => {
      const itemInput = getByTestId(`${label}_input`);
      expect(itemInput).toBeTruthy();
    });
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
      const { getByTestId, getByPlaceholderText, debug } = testingLib;
      const signUpFormInputObj = [{
        label: 'Email',
        value: 'test@test.com',
      }, {
        label: 'Password',
        value: 'testPassword',
      }, {
        label: 'Confirm password',
        value: 'testPassword',
      }, {
        label: 'Name',
        value: 'testName',
      }, {
        label: 'Status',
        value: 'testStatus',
      }];

      signUpFormInputObj.forEach(({ label, value }) => {
        const input = getByPlaceholderText(label);
        fireEvent.changeText(input, value);
        expect(input.props.value).toBe(value);
      });

      const btnInstance = getByTestId('btnSignUpConfirm');
      // debug();
      // all inputs are valid so the submit button's disabled prop is false.
      expect(btnInstance.props.disabled).toBeFalsy();

      /* fireEvent.press(btnInstance); FIXME: needs more investigation for mocking react-hook-form library
      act(() => {
        const { result } = renderHook(() => useFormContext());
        const values = result.current.getValues();
        console.log('values: ', values);
      }); */
    });
  });

  afterEach(() => {
    cleanup();
  });
});
