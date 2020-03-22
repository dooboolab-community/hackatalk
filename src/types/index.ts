import { StyleProp, TextStyle } from 'react-native';

import { SFC } from 'react';

export enum MessageType {
  Message,
  Photo,
  File,
}

export enum AuthType {
  EMAIL,
  FACEBOOK,
  GOOGLE,
  APPLE
}

export interface User {
  id: string;
  email?: string;
  nickname?: string;
  birthday?: Date;
  name?: string;
  thumbURL?: string;
  photoURL?: string;
  statusMessage?: string;
  isOnline?: boolean;
  socialId?: string;
  lastSignedIn?: string;
  authType?: AuthType;
  verified?: boolean;
  created?: string;
  updated?: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface Friend extends User {
  isFriend?: boolean;
  friendSince: Date;
}

export interface MessageCommon<T extends MessageType = MessageType.Message> {
  id: string;
  sender: User;
  messageType?: T;
  created?: string;
  updated?: string;
}

interface Message extends MessageCommon<MessageType.Message> {
  message: string;
}

interface Photo extends MessageCommon<MessageType.Photo> {
  photo: string;
}

interface File extends MessageCommon<MessageType.File> {
  file: string;
}

export type MessageProps = Message | Photo | File;

export interface ChannelType {
  id: string;
  lastMessage: MessageProps;
  lastMessageCnt: number;
  messages?: MessageProps[];
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
