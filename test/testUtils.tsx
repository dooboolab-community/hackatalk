import React, { ReactElement } from 'react';

import { AllProviders } from '../src/providers';
import { ThemeType } from '@dooboo-ui/native-theme';
import { User } from '../src/types';

export const createTestElement = (
  child: ReactElement,
  themeType?: ThemeType,
  user?: User,
): ReactElement => (
  <AllProviders
    initialThemeType={themeType}
    initialAuthUser={user}>
    {child}
  </AllProviders>
);

export const createTestProps = (obj: object = {}): object | unknown | any => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
  },
  ...obj,
});
