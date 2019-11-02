import { StyleProp, TextStyle } from 'react-native';

import { DefaultTheme } from 'styled-components';
import { SFC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

export interface User {
  uid: string;
  displayName: string;
  thumbURL: string;
  photoURL: string;
  statusMsg: string;
  online?: boolean;
  created?: Date;
  updated?: Date;
}

export interface Friend extends User {
  isFriend?: boolean;
  friendSince: Date;
}

export interface AuthUser extends User {
  friends?: [];
  chatrooms?: [];
}

enum MessageType {
  Message,
  Photo,
}

export interface Chat {
  id: string;
  sender: User;
  messageType?: MessageType;
  message?: string;
  photo?: string;
  created?: Date;
  updated?: Date;
}

export interface Chatroom {
  id: string;
  secret: string;
  lastChat: Chat;
  lastChatCnt: number;
  chats?: Chat[];
  users?: User[];
  created?: Date;
  updated?: Date;
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

export interface ScreenProps {
  theme: DefaultTheme;
  changeThemeType: Function;
}

type StackParamList = {
  HomeStack: {
    screenProps: ScreenProps;
  };
  AuthStack: {
    screenProps: ScreenProps;
  };
};

export type DefaultNavigationProps<
  T extends keyof StackParamList
> = StackNavigationProp<StackParamList, T>;
