import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    backgroundDark: string;
    btnPrimary: string;
    btnPrimaryFont: string;
    btnPrimaryLight: string;
    btnPrimaryLightFont: string;
    textDisabled: string;
    btnDisabled: string;
    fontColor: string;
    fontSubColor: string;
    tintColor: string;
    lineColor: string;
    indicatorColor: string;
    inactiveColor: string;
    primary: string;
    primaryLight: string;
    status: string;
    placeholder: string;
  }
}
