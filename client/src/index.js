import { AppRegistry, YellowBox } from 'react-native';

import App from './App';
import env from '@env';

console.log('env', env);

/**
 * React Native 0.54 warning message ignore.
 */
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader',
]);

AppRegistry.registerComponent('HackaTalk', () => App);
