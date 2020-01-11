import { Dimensions, Platform, ScaledSize } from 'react-native';

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

export const screenWidth = width;
export const screenHeight = height;
export const ratio = calRatio / (360 / 9);

export function isIPhoneXSize(dim: ScaledSize): boolean {
  return dim.height === 812 || dim.width === 812;
}

export function isIPhoneXrSize(dim: ScaledSize): boolean {
  return dim.height === 896 || dim.width === 896;
}

export function isIphoneX(): boolean {
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&

    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}
