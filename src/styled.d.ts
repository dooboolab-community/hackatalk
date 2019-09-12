import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    screenWidth: number,
    screenHeight: number,
    ratio: number,
    statusBarHeight: number,
    colors?: {
      background: string,
      subBackground: string,
      text: string,
      subText: string,
      title: string,
      border: string,
      subBorder: string,
      primaryButton: string,
      primaryButtonText: string,
      primaryButtonBorder: string,
      secondaryButton: string,
      secondaryButtonText: string,
      secondaryButtonBorder: string,
      searchBackground: string,
      dodgerBlue: string,
      dusk: string,
      blueyGray: string,
      cloudyBlue: string,
      greenishCyan: string,
      paleGray: string
    }
  }
}
