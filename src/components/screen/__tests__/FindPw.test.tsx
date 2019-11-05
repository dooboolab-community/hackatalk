import * as React from 'react';

import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
  toJSON,
  waitForElement,
  within,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../utils/testUtils';

import FindPw from '../FindPW';
import { ThemeType } from '../../../types';
import { createTheme } from '../../../theme';
import { getString } from '../../../../STRINGS';

let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

describe('[FindPw] screen', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<FindPw {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const { container } = testingLib;
    expect(toJSON(container)).toMatchSnapshot();
  });

  describe('interactions', () => {
    beforeEach(() => {
      testingLib = render(component);
    });

    it('should be highlighted when the input is focused', async () => {
      const theme = createTheme(ThemeType.LIGHT);
      const { getByTestId, getByText } = testingLib;
      const emailInput = getByTestId('findPw_email_input');
      const emailInputLabel = await waitForElement(() => getByText(getString('EMAIL')));
      expect(emailInputLabel.props.style).toHaveProperty([0, 'color'], theme.inactiveColor);

      fireEvent.focus(emailInput);
      const emailInputLabel2 = await waitForElement(() => getByText(getString('EMAIL')));
      expect(emailInputLabel2.props.style).toHaveProperty([0, 'color'], theme.primary);
    });

    it('should validate email format', async () => {
      const { getByTestId, getByText } = testingLib;
      const emailInput = getByTestId('findPw_email_input');

      fireEvent.changeText(emailInput, 'wrongEmailFormat.bah');
      const emailInputError = await waitForElement(() => getByText(getString('EMAIL_FORMAT_NOT_VALID')));
      expect(emailInputError).toBeTruthy();
      const btnFindPwConfirmText = getByText(getString('PASSWORD_RESET'));
      expect(btnFindPwConfirmText.props).toHaveProperty('disabled');

      fireEvent.changeText(emailInput, 'correctEmailFormat@bah.meh');
      const btnFindPwConfirm = await waitForElement(() => getByTestId('btnFindPwConfirm'));
      const btnFindPwConfirmText2 = within(btnFindPwConfirm).getByText(getString('PASSWORD_RESET'));

      expect(btnFindPwConfirmText2.props).toHaveProperty('disabled', false);
    });

    afterEach(() => {
      cleanup();
    });
  });
});
