import React, { ReactElement } from 'react';

import { AllProviders } from '../src/providers';
import { ThemeType } from '../src/types';

export const createTestElement = (
  child: ReactElement,
  themeType?: ThemeType,
): ReactElement => (
  <AllProviders initialThemeType={themeType}>{child}</AllProviders>
);

export const createTestProps = (obj: object = {}): object | unknown | any => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    resetRoot: jest.fn(),
  },
  ...obj,
});
