import { AppLoading, Asset } from 'expo';
import React, { useState } from 'react';

import Icons from './utils/Icons';
import { Image } from 'react-native';
import RootNavigator from './components/navigation/RootStackNavigator';
import RootProvider from './providers';
import { useThemeContext } from './providers/ThemeProvider';

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
    <RootProvider>
      <App />
    </RootProvider>
  );
}

export default ProviderWrapper;
