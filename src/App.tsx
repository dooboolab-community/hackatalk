import { AppLoading, Asset } from 'expo';
import React, { useState } from 'react';
import { ThemeProvider, useThemeContext } from './providers/ThemeProvider';

import Icons from './utils/Icons';
import { Image } from 'react-native';
import RootNavigator from './components/navigation/RootStackNavigator';
import { StateProvider } from './contexts';
import { ThemeType } from './types';

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
  const { theme, changeThemeType } = useThemeContext();
  return <RootNavigator screenProps={{ theme, changeThemeType }} />;
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
    <ThemeProvider
      initialThemeType={ThemeType.LIGHT}
    ><StateProvider>
        <App />
      </StateProvider>
    </ThemeProvider>
  );
}

export default ProviderWrapper;
