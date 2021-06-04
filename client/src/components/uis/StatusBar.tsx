import type {FC, ReactElement} from 'react';
import {ThemeType, useTheme} from 'dooboo-ui';

import React from 'react';
import {StatusBar} from 'react-native';
import type {StatusBarStyle} from 'react-native';

type Props = {
  themeType?: ThemeType;
};

const Shared: FC<Props> = ({themeType}): ReactElement => {
  const {themeType: currentThemeType} = useTheme();

  const statusColor: StatusBarStyle =
    (themeType || currentThemeType) === 'light'
      ? 'dark-content'
      : 'light-content';

  return <StatusBar barStyle={statusColor} />;
};

export default Shared;
