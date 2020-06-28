import { asNexusMethod, enumType, scalarType } from '@nexus/schema';

import { GraphQLDate } from 'graphql-iso-date';
import { GraphQLUpload } from 'graphql-upload';

export const AuthType = enumType({
  name: 'AuthType',
  members: ['email', 'facebook', 'google', 'apple'],
});

enum GenderType {
  male = 'male',
  female = 'demale',
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
