import { StyleProp, TextStyle } from 'react-native';

import { SFC } from 'react';

export interface User {
  uid: string;
  displayName: string;
  thumbURL: string;
  photoURL: string;
  statusMsg: string;
  online: boolean;
  created?: Date;
  updated?: Date;
}

export interface AuthUser extends User {
  friends?: [];
  chatrooms?: [];
}

// export type Friend = Omit<User, 'uid'>;

interface IconProps {
  style?: StyleProp<TextStyle>;
  width?: number | string;
  height?: number | string;
  children?: never;
}

export type IconType = SFC<IconProps>;

export enum ThemeType {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}
