import { DefaultTheme } from 'styled-components';
import { Dimensions } from 'react-native';

export enum ThemeType {
  LIGHT = 'LIGHT',
  NIGHT = 'NIGHT',
}

const { width, height } = Dimensions.get('window');

let calRatio = width <= height ? 16 * (width / height) : 16 * (height / width);
if (width <= height) {
  if (calRatio < 9) {
    calRatio = width / 9;
  } else {
    calRatio = height / 18;
  }
} else {
  if (calRatio < 9) {
    calRatio = height / 9;
  } else {
    calRatio = width / 18;
  }
}

const createTheme = (type = ThemeType.LIGHT) => {
  const themeStyle: DefaultTheme = {
    screenWidth: width,
    screenHeight: height,
    ratio: calRatio / (360 / 9),
    statusBarHeight: getStatusBarHeight(true),
    colors: null,
  };

  switch (type) {
    case ThemeType.LIGHT:
      themeStyle.colors = {
        background: '#FFF',
        subBackground: '#FFF',
        text: 'rgb(65,77,107)',
        subText: 'rgb(134,154,183)',
        title: '#000',
        border: 'rgb(245,245,245)',
        subBorder: 'rgb(233,237,244)',
        primaryButton: 'rgb(58,139,255)',
        primaryButtonText: '#FFF',
        primaryButtonBorder: 'rgb(58,139,255)',
        secondaryButton: '#FFF',
        secondaryButtonText: 'rgb(58,139,255)',
        secondaryButtonBorder: 'rgb(58,139,255)',
        searchBackground: 'rgb(247,248,251)',
        dodgerBlue: 'rgb(58,139,255)',
        dusk: 'rgb(65,77,107)',
        blueyGray: 'rgb(134,154,183)',
        cloudyBlue: 'rgb(175,194,219)',
        greenishCyan: 'rgb(80,227,194)',
        paleGray: 'rgb(233,237,244)',
      };
      break;
    case ThemeType.NIGHT:
      themeStyle.colors = {
        background: '#141d26',
        subBackground: '#243447',
        text: '#FFF',
        subText: '#FFF',
        title: '#FFF',
        border: '#243447',
        subBorder: '#FFF',
        primaryButton: 'rgb(58,139,255)',
        primaryButtonText: '#FFF',
        primaryButtonBorder: 'rgb(58,139,255)',
        secondaryButton: '#243447',
        secondaryButtonText: '#FFF',
        secondaryButtonBorder: '#243447',
        searchBackground: '#243447',
        dodgerBlue: 'rgb(58,139,255)',
        dusk: 'rgb(65,77,107)',
        blueyGray: 'rgb(134,154,183)',
        cloudyBlue: 'rgb(175,194,219)',
        greenishCyan: 'rgb(80,227,194)',
        paleGray: 'rgb(233,237,244)',
      };
      break;
  }
  return themeStyle;
};

export default createTheme;
