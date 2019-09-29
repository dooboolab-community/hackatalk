import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import React, { ReactElement } from 'react';
import { Theme, createTheme } from '../../theme';

import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import NotFound from '../screen/NotFound';
import { ThemeProvider } from 'styled-components';
import { ThemeType } from '../../types';
import { useStateValue } from '../../contexts';

type TChangeTheme = (theme?: ThemeType) => void;

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
  changeTheme: (theme?: ThemeType) => void;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function Navigator(): ReactElement {
  const [{ theme: themeState }, dispatch] = useStateValue();
  const changeTheme: TChangeTheme = (theme) => {
    // console.log('hi, this is the theme: ', theme);
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
