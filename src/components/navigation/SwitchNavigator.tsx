import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import React, { ReactElement } from 'react';
import { Theme, createTheme } from '../../theme';
import { ThemeType } from '../../types';
import { useStateValue } from '../../contexts';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import NotFound from '../screen/NotFound';
import { ThemeProvider } from 'styled-components';

type TChangeTheme = (theme: ThemeType) => void;

const SwitchNavigator = createSwitchNavigator(
  {
    NotFound,
    AuthStackNavigator,
    MainStackNavigator,
  },
  {
    initialRouteName: 'AuthStackNavigator',
  },
);

const AppContainer = createAppContainer(SwitchNavigator);

export interface ScreenProps {
  theme: Theme;
  changeTheme: () => void;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function Navigator(): ReactElement {
  const [{ theme: themeState }, dispatch] = useStateValue();
  const changeTheme: TChangeTheme = (theme) => {
    if (!theme) {
      theme = themeState === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK;
    }
    dispatch({
      type: 'change-theme-mode',
      payload: {
        theme,
      },
    });
  };
  return (
    <ThemeProvider theme={createTheme(themeState)}>
      <AppContainer
        screenProps={{
          theme: createTheme(themeState),
          changeTheme,
        }}
      />
    </ThemeProvider>
  );
}
