import { NexusGenArgTypes, NexusGenInputs, NexusGenRootTypes } from '../../../src/generated/nexus';

import { Context } from '../apis/types';
import { IResolvers } from 'apollo-server';

export const userResolvers: IResolvers = {
  Query: {
    me: (
      _: 'User',
      __: void,
      { dataSources }: Context,
    ): Promise<NexusGenRootTypes['User']> =>
      dataSources.userAPI.me(),
    user: (
      _: 'User',
      id: NexusGenArgTypes['Query']['user'],
      { dataSources }: Context,
    ): Promise<NexusGenRootTypes['User']> =>
      dataSources.userAPI.user(id),
    users: (
      _: 'User',
      args: NexusGenArgTypes['Query']['users'],
      { dataSources }: Context,
    ): Promise<NexusGenRootTypes['UserEdge'][]> =>
      dataSources.userAPI.users(args),
  },
  Mutation: {
    signUp: (
      _: 'User',
      signUpUser: NexusGenInputs['UserCreateInput'],
      { dataSources }: Context,
    ): Promise<NexusGenRootTypes['User']> => {
      const user = dataSources.userAPI.signUp(
        signUpUser,
      );

      return user;
    },
    signInEmail: (
      _: 'AuthPayload',
      args: NexusGenArgTypes['Mutation']['signInEmail'],
      { dataSources }: Context,
    ): Promise<NexusGenRootTypes['AuthPayload']> => {
      const signInUser = dataSources.userAPI.signInEmail(
        args,
      );

      return signInUser;
    },

  },
};
