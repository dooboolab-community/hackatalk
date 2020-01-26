import { StyleProp, TextStyle } from 'react-native';

import { SFC } from 'react';

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
  socialId: string;
  AuthType: string;
  verified: boolean;
  created?: Date;
  updated?: Date;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface Friend extends User {
  isFriend?: boolean;
  friendSince: Date;
}

export enum SocialType {
  Email,
  Google,
  Facebook,
  Apple,
}

export interface AuthUser extends User {
  friends?: [];
  channels?: [];
  social?: SocialType;
}

export interface ChannelCommon<T extends MessageType = MessageType.Message> {
  id: string;
  sender: User;
  messageType?: T;
  created?: Date;
  updated?: Date;
}

interface Message extends ChannelCommon<MessageType.Message> {
  message: string;
}

interface Photo extends ChannelCommon<MessageType.Photo> {
  photo: string;
}

interface File extends ChannelCommon<MessageType.File> {
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
