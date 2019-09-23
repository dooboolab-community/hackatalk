import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import React, { useContext } from 'react';
import { Theme, createTheme } from '../../theme';

import { AppContext } from '../../contexts';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import NotFound from '../screen/NotFound';
import { ThemeProvider } from 'styled-components';

const SwitchNavigator = createSwitchNavigator(
  {
    NotFound,
    AuthStackNavigator,
    MainStackNavigator,
  },
  {
    initialRouteName: 'MainStackNavigator',
  },
);

const AppContainer = createAppContainer(SwitchNavigator);

export interface ScreenProps {
  theme: Theme;
  changeTheme: () => void;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function Navigator() {
  const { state, dispatch, changeTheme } = useContext(AppContext);
  const { theme } = state;

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <AppContainer
        screenProps={{
          theme: createTheme(theme),
          changeTheme,
        }}
      />
    </ThemeProvider>
  );
}
