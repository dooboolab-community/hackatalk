import { StyleProp, TextStyle } from 'react-native';

import { DefaultTheme } from 'styled-components';
import { SFC } from 'react';

export interface User {
  uid: string;
  displayName: string;
  photoURL: string;
  statusMsg: string;
}

interface IconProps {
  style?: StyleProp<TextStyle>;
  width?: number | string;
  height?: number | string;
  children?: never;
}
