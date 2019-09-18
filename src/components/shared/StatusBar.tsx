import { AppContext } from '../../providers/AppProvider';
import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeType } from '../../types';

// prettier-ignore
function Shared() {
  const { state } = React.useContext(AppContext);
  const statusColor = state.theme === ThemeType.LIGHT ? 'dark-content' : 'light-content';

  return <StatusBar barStyle={statusColor} />;
}

export default Shared;
