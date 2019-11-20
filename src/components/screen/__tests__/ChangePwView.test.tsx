import * as React from 'react';
import ChangePw, { Props } from '../Setting/ChangePw';

import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
  wait,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../utils/testUtils';

import { Alert } from 'react-native';
import { getString } from '../../../../STRINGS';
import renderer from 'react-test-renderer';

let props: Props;
let component: React.ReactElement;

const alert = jest.spyOn(Alert, 'alert');

describe('[ChangePw] screen', () => {
  let testingLib: RenderResult;

  beforeEach(() => {
    props = createTestProps({
      close: jest.fn(),
      validateCurrentPw: () => new Promise((resolve): void => resolve((text) => text === 'right')),
    });
    component = createTestElement(
      <ChangePw {...props} />
    );
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('interactions', () => {
    beforeEach(() => {
      testingLib = render(component);
    });

    it('should simulate close called', async () => {
      const btn = testingLib.getByTestId('closeBtn');
      fireEvent.press(btn);
      expect(props.close).toHaveBeenCalled();
    });

    it('should simulate textChanged', async () => {
      const pwInput = testingLib.getByTestId('currentPwTextInput');
      const verifyBtn = testingLib.getByTestId('checkCurrentPwBtn');
      fireEvent.changeText(pwInput, 'left');

      fireEvent.press(verifyBtn);
      // expect(alert).toHaveBeenCalled();

      fireEvent.changeText(pwInput, 'right');
      fireEvent.press(verifyBtn);

      await wait(() => expect(testingLib.queryByTestId('newPwTextInput')).toBeTruthy());

      await testingLib.findByText(getString('CONFIRM'));

      const newPwInput = testingLib.getByTestId('newPwTextInput');
      const newPwInputCheck = testingLib.getByTestId('validationWordTextInput');
      fireEvent.changeText(newPwInput, 'test');
      fireEvent.changeText(newPwInputCheck, 'test1');
      fireEvent.press(verifyBtn);

      fireEvent.changeText(newPwInputCheck, 'test');
      fireEvent.press(verifyBtn);
    });
  });

  afterAll(() => {
    cleanup();
  });
});
