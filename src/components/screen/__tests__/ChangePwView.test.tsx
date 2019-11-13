import 'react-native';

import * as React from 'react';

import ChangePwView, { Props } from '../Setting/ChangePwView';
import {
  RenderResult,
  cleanup,
  fireEvent,
  queryByTestId,
  render,
  wait,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../utils/testUtils';

import { getString } from '../../../../STRINGS';
import renderer from 'react-test-renderer';

let props: Props;
let component: React.ReactElement;

describe('[ChangePwView] screen', () => {
  let testingLib: RenderResult;

  beforeEach(() => {
    props = createTestProps({
      close: jest.fn(),
      checkCurrentPw: () => new Promise((resolve): void => resolve((text) => text === 'right')),
    });
    component = createTestElement(
      <ChangePwView {...props} />
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
      fireEvent.changeText(pwInput, 'right');
      fireEvent.press(verifyBtn);

      await wait(() => expect(testingLib.queryByTestId('newPwTextInput')).toBeTruthy());
      // expect(verifyBtn.props.child).toBe(getString('CONFIRM'));

      const newPwInput = testingLib.getByTestId('newPwTextInput');
      const newPwInputCheck = testingLib.getByTestId('newPwCheckTextInput');
      fireEvent.changeText(newPwInput, 'test');
      fireEvent.changeText(newPwInputCheck, 'test');
      fireEvent.press(verifyBtn);
    });
  });

  afterAll(() => {
    cleanup();
  });
});
