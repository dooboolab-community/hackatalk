import * as React from 'react';
import ChangePwModal, { ChangePw } from '../ChangePwModal';

import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
  wait,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../utils/testUtils';
import { getString } from '../../../../STRINGS';
import renderer from 'react-test-renderer';

let component: React.ReactElement;
let innerComponent: React.ReactElement;

describe('[ChangePw] screen', () => {
  let testingLib: RenderResult;

  beforeEach(() => {
    component = createTestElement(
      <ChangePwModal />
    );
    innerComponent = createTestElement(
      <ChangePw close={jest.fn()} />
    );
    testingLib = render(innerComponent);
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();

    const renderedContent = renderer.create(innerComponent).toJSON();
    expect(renderedContent).toMatchSnapshot();
    expect(renderedContent).toBeTruthy();
  });

  it('snapshot check if modal open', () => {
    expect(testingLib.asJSON()).toMatchSnapshot();
  });

  describe('interactions', () => {
    it('should simulate textChanged', async () => {
      const pwInput = testingLib.getByTestId('currentPwTextInput');
      const verifyBtn = testingLib.getByTestId('checkCurrentPwBtn');
      fireEvent.changeText(pwInput, 'left');

      fireEvent.press(verifyBtn);

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
