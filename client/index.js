import 'moment/locale/ko';
import 'expo-asset';

import * as Sentry from 'sentry-expo';

import {App} from './src';

Sentry.init({
  dsn:
    'https://f079a8d840c5443d93119874d7cd543e@o181475.ingest.sentry.io/5521351',
  enableInExpoDevelopment: true,
  debug: !!__DEV__,
});

export default App;