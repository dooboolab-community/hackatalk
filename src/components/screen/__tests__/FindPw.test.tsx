import 'react-native';

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

import FindPw from '../FindPw';
import renderer from 'react-test-renderer';

let props: any;
let component: ReactElement;

describe('[FindPw] rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<FindPw {...props} />);
  });

  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[FindPw] interaction', () => {
  let testingLib: RenderResult;

  beforeAll(() => {
    props = createTestProps();
    component = createTestElement(<FindPw {...props} />);
    testingLib = render(component);
  });

  it('should invoke changeText event handler when email changed', async () => {
    const textInput = testingLib.getByTestId('input-email');
    await wait(() => expect(textInput).toBeTruthy());

    act(() => {
      fireEvent.changeText(textInput, 'email@email.com');
    });

    expect(textInput.props.value).toEqual('email@email.com');
  });

  describe('onFindPw', () => {
    beforeAll(() => {
      props = createTestProps();
      component = createTestElement(<FindPw {...props} />);
      testingLib = render(component);
    });

    it('should show error text when the email is not validated', async () => {
      const textInput = testingLib.getByTestId('input-email');
      await wait(() => expect(textInput).toBeTruthy());

      act(() => {
        fireEvent.changeText(textInput, 'example@example');
      });

      const btnFindPw = testingLib.getByTestId('btn-find-pw');
      await wait(() => expect(btnFindPw).toBeTruthy());
      act(() => {
        fireEvent.press(btnFindPw);
      });
      const errorText = testingLib.getByTestId('error-email');
      await act(() => wait());
      expect(errorText).toBeTruthy();
    });

    it('should call FindPw when button has clicked and navigate to SignIn', async () => {
      const textInput = testingLib.getByTestId('input-email');

      act(() => {
        fireEvent.changeText(textInput, 'email@email.com');
      });

      const btnFindPw = testingLib.getByTestId('btn-find-pw');
      await wait(() => expect(btnFindPw).toBeTruthy());

      jest.useFakeTimers();
      act(() => {
        fireEvent.press(btnFindPw);
        jest.runAllTimers();
      });

      await act(() => wait());
      expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    });

    it('should do nothing when navigation is not defined.', async () => {
      props = createTestProps({
        navigation: null,
      });
      component = createTestElement(<FindPw {...props} />);
      testingLib = render(component);

      const textInput = testingLib.getByTestId('input-email');
      await wait(() => expect(textInput).toBeTruthy());

      act(() => {
        fireEvent.changeText(textInput, 'email@email.com');
      });

      const btnFindPw = testingLib.getByTestId('btn-find-pw');
      await wait(() => expect(btnFindPw).toBeTruthy());

      jest.useFakeTimers();
      act(() => {
        fireEvent.press(btnFindPw);
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
