import { AuthUser, ThemeType } from '../src/types';
import React, { ReactElement } from 'react';

import { AllProviders } from '../src/providers';

export const createTestElement = (
  child: ReactElement,
  themeType?: ThemeType,
  authUser?: AuthUser,
): ReactElement => (
  <AllProviders
    initialThemeType={themeType}
    initialAuthUser={authUser}>
    {child}
  </AllProviders>
);

export const createTestProps = (obj: object = {}): object | unknown | any => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    resetRoot: jest.fn(),
  },
  ...obj,
});
