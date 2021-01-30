import 'moment/locale/ko';
import 'expo-asset';

import * as Sentry from 'sentry-expo';

import {AppRegistry, Platform} from 'react-native';

import App from './App';

Sentry.init({
  dsn:
    'https://f079a8d840c5443d93119874d7cd543e@o181475.ingest.sentry.io/5521351',
  enableInExpoDevelopment: true,
  debug: !!__DEV__,
});

AppRegistry.registerComponent('HackaTalk', () => App);

if (Platform.OS === 'web') {
  AppRegistry.runApplication('HackaTalk', {
    rootTag: document.getElementById('root'),
  });

  // Register service worker.
  if ('serviceWorker' in navigator)
    navigator.serviceWorker.register(
      `${process.env.PUBLIC_URL}/service-worker.js`,
    );
}

export default App;
