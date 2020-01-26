import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { AuthUserProvider, useAuthUserContext } from './providers/AuthUserProvider';
import React, { useEffect, useState } from 'react';
import { ThemeProvider, ThemeType } from '@dooboo-ui/native-theme';
import { dark, light } from './theme';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import Icons from './utils/Icons';
import { QUERY_ME } from './graphql/queries';
import RootNavigator from './components/navigation/RootStackNavigator';
import { User } from './types';
import client from './apollo/Client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cacheImages(images: any[]): any[] {
  return images.map((image) => {
    return Asset.fromModule(image).downloadAsync();
  });
}

const loadAssetsAsync = async (): Promise<void> => {
  const imageAssets = cacheImages(Icons);
  await Promise.all([...imageAssets]);
};

function App(): React.ReactElement {
  const colorScheme = useColorScheme();

  const [ready, setReady] = useState(false);
  const { setAuthUser } = useAuthUserContext();

  const { loading, data } = useQuery<{ me: User}, {}>(QUERY_ME);

  useEffect(() => {
    if (data && data.me) {
      setAuthUser(data.me);
    }
  }, [loading]);

  if (loading || !ready) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={(): void => setReady(true)}
        onError={console.warn}
      />
    );
  }

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
  return (
    <AppearanceProvider>
      <AuthUserProvider>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </AuthUserProvider>
    </AppearanceProvider>
  );
}

export default ProviderWrapper;
