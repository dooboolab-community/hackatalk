import {AppRegistry, Platform} from 'react-native';

import App from './App';

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
