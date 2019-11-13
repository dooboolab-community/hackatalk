import { AppLoading, Asset } from 'expo';
import React, { useState } from 'react';
import { dark, light } from './theme';

import { AppearanceProvider } from 'react-native-appearance';
import Icons from './utils/Icons';
import { Image } from 'react-native';
import RootNavigator from './components/navigation/RootStackNavigator';
import { ThemeProvider } from '@dooboo-ui/native-theme';

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

function ProviderWrapper(): React.ReactElement {
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
    <AppearanceProvider>
      <ThemeProvider customTheme={{ light, dark }}>
        <RootNavigator />
      </ThemeProvider>
    </AppearanceProvider>
  );
}

export default ProviderWrapper;
