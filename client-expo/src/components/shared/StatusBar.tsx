import React, {ReactElement} from 'react';
import {ThemeType, useThemeContext} from '@dooboo-ui/theme';

import {StatusBar} from 'react-native';

export default function Shared(): ReactElement {
  const {themeType} = useThemeContext();

  const statusColor =
    themeType === ThemeType.LIGHT ? 'dark-content' : 'light-content';

  return <StatusBar barStyle={statusColor} />;
}
