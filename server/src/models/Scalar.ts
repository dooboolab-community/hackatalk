import { asNexusMethod, scalarType } from 'nexus';

import { GraphQLDate } from 'graphql-iso-date';
import { GraphQLUpload } from 'graphql-upload';

export enum AuthType {
  email = 'email',
  facebook = 'facebook',
  google = 'google',
  apple = 'apple',
}

export const Auth = scalarType({
  name: 'Auth',
  asNexusMethod: 'auth',
  parseValue(value: AuthType): AuthType {
    if (AuthType[value]) {
      return value;
    }
  },
  serialize(value) {
    return value;
  },
});

export enum Gender {
  male = 'male',
  female = 'female',
}

export const gender = scalarType({
  name: 'Gender',
  asNexusMethod: 'gender',
  parseValue(value: Gender): Gender {
    if (Gender[value]) {
      return value;
    }
  },
  serialize(value) {
    return value;
  },
});

export enum MembershipType {
  owner = 'owner',
  admin = 'admin',
  member = 'member'
}

export const membershipType = scalarType({
  name: 'MembershipType',
  asNexusMethod: 'membershipType',
  parseValue(value: MembershipType): MembershipType {
    if (MembershipType[value]) {
      return value;
    }
  },
  serialize(value) {
    return value;
  },
});

export enum AlertMode {
  sound = 'sound',
  vibrate = 'vibrate',
  silent = 'silent'
}

export const alertMode = scalarType({
  name: 'AlertMode',
  asNexusMethod: 'alertMode',
  parseValue(value: AlertMode): AlertMode {
    if (AlertMode[value]) {
      return value;
    }
  },
  serialize(value) {
    return value;
  },
});

export enum ChannelType {
  private = 'private',
  public = 'public',
}

export const channelType = scalarType({
  name: 'ChannelType',
  asNexusMethod: 'channelType',
  parseValue(value: ChannelType): ChannelType {
    if (ChannelType[value]) {
      return value;
    }
  },
  serialize(value) {
    return value;
  },
});

export enum MessageType {
  text = 'text',
  photo = 'photo',
  file = 'file',
}

export const messageType = scalarType({
  name: 'MessageType',
  asNexusMethod: 'messageType',
  parseValue(value: MessageType): MessageType {
    if (MessageType[value]) {
      return value;
    }
  },
  serialize(value) {
    return value;
  },
});

export const Upload = GraphQLUpload;
export const DateTime = GraphQLDate;
export const GQLDate = asNexusMethod(GraphQLDate, 'date');
