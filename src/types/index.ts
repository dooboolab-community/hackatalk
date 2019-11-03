import { StyleProp, TextStyle } from 'react-native';

import { DefaultTheme } from 'styled-components';
import { SFC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

export enum MessageType {
  Message,
  Photo,
  File,
}

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

export interface ChatCommon<T extends MessageType = MessageType.Message> {
  id: string;
  sender: User;
  messageType: T;
  created?: Date;
  updated?: Date;
}

interface Message<T extends MessageType = MessageType.Message> extends ChatCommon<T> {
  message: string;
}

interface Photo<T extends MessageType = MessageType.Message> extends ChatCommon<T> {
  photo: string;
}

interface File<T extends MessageType = MessageType.Message> extends ChatCommon<T> {
  photo: string;
}

export type ChatProps<T extends MessageType = MessageType.Message>
  = T extends MessageType.Message
    ? Message<T>
    : T extends MessageType.Photo
    ? Photo<T>
    : T extends MessageType.File
    ? File<T>
    : ChatCommon<T>;

type ChatType = MessageType.Message | MessageType.Photo | MessageType.File;
export type Chat = ChatProps<ChatType>;

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
  Default: undefined;
  AuthStack: undefined;
  MainStack: undefined;
  Login: undefined;
  SignUp: undefined;
  FindPw: undefined;
  ProfileUpdate: undefined;
  Setting: undefined;
  Friend: undefined;
  Message: undefined;
  Chatroom: undefined;
  SearchUser: undefined;
  Chat: {
    chatId: string;
  };
  Temp: undefined;
  NotFound: undefined;
};

export type DefaultNavigationProps<
  T extends keyof StackParamList = 'Default'
> = StackNavigationProp<StackParamList, T>;
