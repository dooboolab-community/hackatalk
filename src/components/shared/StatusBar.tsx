import React, { ReactElement } from 'react';

import { StatusBar } from 'react-native';
import { ThemeType } from '../../types';
import { useThemeContext } from '@dooboo-ui/native-theme';

export default function Shared(): ReactElement {
  const { themeType } = useThemeContext();
  const statusColor =
    themeType === ThemeType.LIGHT ? 'dark-content' : 'light-content';

  return <StatusBar barStyle={statusColor} />;
}
