import { asNexusMethod, scalarType } from '@nexus/schema';

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

export enum GenderType {
  male = 'male',
  female = 'female',
}
export const Gender = scalarType({
  name: 'Gender',
  asNexusMethod: 'gender',
  parseValue(value: GenderType): GenderType {
    if (GenderType[value]) {
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
