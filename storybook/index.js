import './rn-addons';

import { configure, getStorybookUI } from '@storybook/react-native';

// import stories
configure(() => {
  require('./stories');
}, module);

// eslint-disable-next-line max-len
// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({ port: 7007, host: 'localhost' });

export default StorybookUIRoot;
