import { AppLoading, Asset } from 'expo';
import React, { useState } from 'react';

import Icons from './utils/Icons';
import { Image } from 'react-native';
import { AppProvider as Provider } from './providers';
import SwitchNavigator from './components/navigation/SwitchNavigator';

function cacheImages(images: Image[]) {
  return images.map((image: Image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const loadAssetsAsync = async () => {
  const imageAssets = cacheImages(Icons);
  await Promise.all([...imageAssets]);
};

const App = () => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setLoading(true)}
        // onError={console.warn}
      />
    );
  }
  return (
    <Provider>
      <SwitchNavigator />
    </Provider>
  );
};

export default App;
