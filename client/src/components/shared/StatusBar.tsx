import React, {ReactElement} from 'react';
import {
  ThemeType,
  useTheme as useThemeContext,
} from '../../providers/ThemeProvider';

import {StatusBar} from 'react-native';

export default function Shared(): ReactElement {
  const {themeType} = useThemeContext();

  const statusColor =
    themeType === ThemeType.LIGHT ? 'dark-content' : 'light-content';

  return <StatusBar barStyle={statusColor} />;
}
