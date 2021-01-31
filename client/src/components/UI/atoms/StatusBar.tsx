import type {FC, ReactElement} from 'react';
import {ThemeType, useThemeContext} from '@dooboo-ui/theme';

import React from 'react';
import {StatusBar} from 'react-native';
import type {StatusBarStyle} from 'react-native';

type Props = {
  themeType?: ThemeType;
};

const Shared: FC<Props> = ({themeType}): ReactElement => {
  const {themeType: currentThemeType} = useThemeContext();

  const statusColor: StatusBarStyle =
    (themeType || currentThemeType) === ThemeType.LIGHT
      ? 'dark-content'
      : 'light-content';

  return <StatusBar barStyle={statusColor} />;
};

export default Shared;
