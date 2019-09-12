import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import NotFound from '../screen/NotFound';
import Loading from '../screen/Loading';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import { ThemeProvider } from '../../utils/styled-components';

import createTheme from '../../utils/theme';

const SwitchNavigator = createSwitchNavigator(
  {
    NotFound,
    Loading,
    AuthStackNavigator,
    MainStackNavigator,
  },
  {
    initialRouteName: 'MainStackNavigator',
  },
);

const AppContainer = createAppContainer(SwitchNavigator);
export default () => {
  const { state } = useContext(AppContext);
  const { theme } = state;
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <AppContainer
        screenProps={{ theme: createTheme(theme) }}
      />
    </ThemeProvider>
  );
};
