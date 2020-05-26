import { NativeModules, Platform } from 'react-native';

import BootSplash from 'react-native-bootsplash';

const COMPONENT_NAME = 'SplashModule';

class SplashModule {
  private readonly native: any;
  constructor(native: any) {
    this.native = native;
  }

  hide = (duration = 500): void => {
    if (Platform.OS === 'android') {
      this.native.hide(duration);
    } else {
      BootSplash.hide({ duration: duration });
    }
  };
}

export default new SplashModule(NativeModules[COMPONENT_NAME]);
