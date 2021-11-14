import * as ScreenOrientation from 'expo-screen-orientation';

import {Dimensions, Platform} from 'react-native';
import {useEffect, useState} from 'react';

export enum Orientation {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

export default function useOrientation(): Orientation {
  const isPortrait =
    Dimensions.get('window').width < Dimensions.get('window').height;

  const [orientation, setOrientation] = useState<Orientation>(
    isPortrait ? Orientation.PORTRAIT : Orientation.LANDSCAPE,
  );

  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener(
      ({orientationInfo}) => {
        const isNewOrientationPortrait =
          orientationInfo.orientation ===
            ScreenOrientation.Orientation.PORTRAIT_UP ||
          orientationInfo.orientation ===
            ScreenOrientation.Orientation.PORTRAIT_DOWN;

        setOrientation(
          isNewOrientationPortrait
            ? Orientation.PORTRAIT
            : Orientation.LANDSCAPE,
        );
      },
    );

    return (): void => {
      if (Platform.OS !== 'web') {
        ScreenOrientation.removeOrientationChangeListener(subscription);
      }
    };
  });

  return orientation;
}
