import { ImageSourcePropType, StyleProp, TextStyle } from 'react-native';

import { SFC } from 'react';

export enum MessageType {
  Message,
  Photo,
  File,
}

export enum SignInType {
  Email,
  Google,
  Facebook,
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
  signedInWith?: SignInType;
}

export interface ChatCommon<T extends MessageType = MessageType.Message> {
  id: string;
  sender: User;
  messageType?: T;
  created?: Date;
  updated?: Date;
}

interface Message extends ChatCommon<MessageType.Message> {
  message: string;
}

interface Photo extends ChatCommon<MessageType.Photo> {
  photo: string;
}

interface File extends ChatCommon<MessageType.File> {
  file: string;
}

export type ChatProps = Message | Photo | File;

export interface Chatroom {
  id: string;
  lastChat: ChatProps;
  lastChatCnt: number;
  chats?: ChatProps[];
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

export interface SettingsOption {
  label: string;
  icon?: ImageSourcePropType;
  onPress(): void;
  testID: string;
}

export enum ThemeType {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}
