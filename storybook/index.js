import './rn-addons';

import { configure, getStorybookUI } from '@storybook/react-native';

import { AppRegistry } from 'react-native';

// import stories
configure(() => {
  require('./stories');
}, module);

// eslint-disable-next-line max-len
// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla and after installation you don't see your app name here,
// write it manually.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;
