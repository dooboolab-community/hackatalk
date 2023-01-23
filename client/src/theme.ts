import type {DoobooTheme} from 'dooboo-ui';

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
  background: 'white',
  paper: '#F2F5F6',
  disabled: '#C4C4C4',
  line: '#gray05',
  text: '#000',
  textLight: '#1B1B1B',
  textContrast: 'white',
  placeholder: '#6D6D6D',
  header: colors.brand,
  card: 'white',
  active: colors.brand,
  primary: colors.brand,
  primaryLight: colors.paleBlue10,
  secondary: colors.green10,
  button: colors.brand,
};

export type Theme = typeof light & DoobooTheme;

export const dark = {
  background: '#000',
  paper: colors.dark,
  disabled: '#515151',
  line: '#000',
  text: 'white',
  textLight: '#D3D3D3',
  textContrast: '#000',
  placeholder: '#6D6D6D',
  header: '#000',
  card: colors.dark,
  active: colors.paleBlue10,
  primary: '#fff',
  primaryLight: '#151A25',
  secondary: colors.green30,
  button: colors.paleBlue10,
};
