import { Dimensions, Platform, ScaledSize } from 'react-native';

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
