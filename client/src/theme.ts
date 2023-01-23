import type {DoobooTheme} from '@dooboo-ui/theme';

/* eslint-disable */
export const colors = {
  brand: '#1E6EFA',
  paleBlue05: '#E2F2FF',
  paleBlue10: '#8BC9FF',
  green10: '#A1EEDB',
  green30: '#00D4AB',
  green50: '#28DB98',
  gray05: '#F3F9FF',
  success: '33ff2f',
  danger: '#ff002e',
  warning: '#f2df0f',
  info: '#3a74e7',
  light: '#ededed',
  dark: '#151C22',
  messagePrimary: '#8BC9FF',
  messageSecondary: '#E2F2FF',
  apple: '#151E22',
  google: '#E04238',
  facebook: '#345997',
};
/* eslint-enable */

export const light = {
  bg: {
    basic: 'white',
    paper: '#F2F5F6',
    disabled: '#C4C4C4',
    border: colors.gray05,
    card: 'white',
  },
  text: {
    basic: '#000',
    contrast: 'white',
    placeholder: '#6D6D6D',
    light: '#1B1B1B',
  },
  button: {
    primary: colors.brand,
  },
  role: {
    primary: colors.brand,
    secondary: colors.green10,
  },
  header: colors.brand,
  active: colors.brand,
  primaryLight: colors.paleBlue10,
};

export type Theme = typeof light & DoobooTheme;

export const dark: Theme = {
  bg: {
    basic: '#000',
    paper: colors.dark,
    disabled: '#515151',
    border: colors.gray05,
    card: colors.dark,
  },
  text: {
    basic: 'white',
    contrast: '#000',
    placeholder: '#6D6D6D',
    light: '#1B1B1B',
  },
  button: {
    primary: colors.paleBlue10,
  },
  role: {
    primary: colors.brand,
    secondary: colors.green30,
  },
  header: '#000',
  active: colors.paleBlue10,
  primaryLight: '#151A25',
};
