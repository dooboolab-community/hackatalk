import React, { ReactElement } from 'react';

import RootProvider from '../providers';
import { ThemeType } from '../types';

export const createTestElement = (
  child: ReactElement,
  themeType?: ThemeType,
): ReactElement => (
  <RootProvider initialThemeType={themeType}>{child}</RootProvider>
);

export const createTestProps = (
  obj: object = {},
  moreScreenProps?: object,
): object | unknown | any => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    resetRoot: jest.fn(),
  },
  screenProps: {
    changeThemeType: jest.fn(),
    ...moreScreenProps,
  },
  ...obj,
});
