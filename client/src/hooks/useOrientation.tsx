import * as ScreenOrientation from 'expo-screen-orientation';

import {useEffect, useState} from 'react';

import {Dimensions} from 'react-native';

export enum Orientation {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

export default function useAppState(): Orientation {
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
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  });

  return orientation;
}
