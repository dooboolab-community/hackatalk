import { AppLoading, Asset } from 'expo';
import React, { ReactElement, useState } from 'react';

import Icons from './utils/Icons';
import { Image } from 'react-native';
import { StateProvider } from './contexts';
import SwitchNavigator from './components/navigation/SwitchNavigator';

function cacheImages(images: Image[]): Image[] {
  return images.map((image: Image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const loadAssetsAsync = async (): Promise<void> => {
  const imageAssets = cacheImages(Icons);
  await Promise.all([...imageAssets]);
};

const App = (): ReactElement => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={(): void => setLoading(true)}
        // onError={console.warn}
      />
    );
  }
  return (
    <StateProvider>
      <SwitchNavigator />
    </StateProvider>
  );
};

export default App;
