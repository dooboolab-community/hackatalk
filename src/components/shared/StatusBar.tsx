import { useStateValue } from '../../contexts';
import React, { ReactElement } from 'react';
import { StatusBar } from 'react-native';
import { ThemeType } from '../../types';

// prettier-ignore
export default function Shared(): ReactElement {
  const [{ theme }] = useStateValue();
  const statusColor = theme === ThemeType.LIGHT ? 'dark-content' : 'light-content';

  return <StatusBar barStyle={statusColor} />;
}
