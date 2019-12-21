import { AppLoading, Asset } from 'expo';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import React, { useState } from 'react';
import { ThemeProvider, ThemeType } from '@dooboo-ui/native-theme';
import { dark, light } from './theme';

import Icons from './utils/Icons';
import { Image } from 'react-native';
import RootNavigator from './components/navigation/RootStackNavigator';

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

function App(): React.ReactElement {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      customTheme={{ light, dark }}
      initialThemeType={
        colorScheme === 'dark' ? ThemeType.DARK : ThemeType.LIGHT
      }
    >
      <RootNavigator />
    </ThemeProvider>
  );
}

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
      <App />
    </AppearanceProvider>
  );
}

export default ProviderWrapper;
