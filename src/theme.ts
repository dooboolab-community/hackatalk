import { DefaultTheme } from 'styled-components';
import { ThemeType } from './types';

const colors = {
  whiteGray: '#f7f6f3',
  dusk: 'rgb(65,77,107)',
  dodgerBlue: 'rgb(58,139,255)',
  skyBlue: 'rgb(100,199,255)',
  green: 'rgb(29,211,168)',
  greenBlue: 'rgb(36,205,151)',
  mediumGray: 'rgb(134,154,183)',
  paleGray: 'rgb(221,226,236)',
  lightBackground: 'white',
  lightBackgroundLight: '#f7f6f3',
  darkBackground: '#323739',
  darkBackgroundLight: '#393241',
};

export interface Theme {
  background: string;
  backgroundDark: string;
  btnPrimary: string;
  btnPrimaryFont: string;
  btnPrimaryLight: string;
  btnPrimaryLightFont: string;
  textDisabled: string;
  btnDisabled: string;
  fontColor: string;
  tintColor: string;
  indicatorColor: string;
  inactiveColor: string;
  primary: string;
  primaryLight: string;
}

const theme = {
  light: {
    background: colors.lightBackground,
    backgroundDark: colors.dodgerBlue,
    btnPrimary: colors.skyBlue,
    btnPrimaryFont: 'white',
    btnPrimaryLight: colors.whiteGray,
    btnPrimaryLightFont: 'black',
    textDisabled: '#969696',
    btnDisabled: 'rgb(224,224,224)',
    fontColor: 'black',
    tintColor: '#333333',
    lineColor: colors.paleGray,
    indicatorColor: colors.dodgerBlue,
    inactiveColor: colors.paleGray,
    primary: colors.dodgerBlue,
    primaryLight: colors.skyBlue,
  },
  dark: {
    background: colors.darkBackground,
    backgroundDark: colors.dodgerBlue,
    btnPrimary: colors.skyBlue,
    btnPrimaryFont: 'white',
    btnPrimaryLight: colors.whiteGray,
    btnPrimaryLightFont: 'black',
    textDisabled: '#969696',
    btnDisabled: 'rgb(224,224,224)',
    fontColor: 'white',
    tintColor: '#a3a3a3',
    lineColor: colors.paleGray,
    indicatorColor: 'white',
    inactiveColor: colors.paleGray,
    primary: colors.darkBackground,
    primaryLight: colors.darkBackground,
  },
};

// prettier-ignore
export const createTheme = (type = ThemeType.LIGHT): DefaultTheme => {
  switch (type) {
  case ThemeType.LIGHT:
    return theme.light;
  case ThemeType.DARK:
    return theme.dark;
  }
};
