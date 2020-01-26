import { AppLoading, Asset } from 'expo';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import React, { useState } from 'react';
import { ThemeProvider, ThemeType } from '@dooboo-ui/native-theme';
import { dark, light } from './theme';

import { ApolloProvider } from '@apollo/react-hooks';
import { AuthUserProvider } from './providers/AuthUserProvider';
import Icons from './utils/Icons';
import { Image } from 'react-native';
import RootNavigator from './components/navigation/RootStackNavigator';
import client from './apollo/Client';

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
      <ApolloProvider client={client}>
        <RootNavigator />
      </ApolloProvider>
    </ThemeProvider>
  );
}

function ProviderWrapper(): React.ReactElement {
  const [ready, setReady] = useState(false);

  if (ready) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={(): void => setReady(true)}
      // onError={console.warn}
      />
    );
  }

  return (
    <AppearanceProvider>
      <AuthUserProvider>
        <App />
      </AuthUserProvider>
    </AppearanceProvider>
  );
}

export default ProviderWrapper;
