import { NexusGenArgTypes, NexusGenInputs, NexusGenRootTypes } from '../../../../src/generated/nexus';

import { Context } from '../../apis/types';
import { IResolvers } from 'apollo-server';

export const userResolvers: IResolvers = {
  Query: {
    me: (
      _: void,
      __: void,
      { dataSources }: Context,
    ): Promise<NexusGenRootTypes['User']> =>
      dataSources.userAPI.me(),
  },
  Mutation: {
    signUp: (
      _: void,
      signUpUser: NexusGenInputs['UserCreateInput'],
      { dataSources }: Context,
    ): Promise<NexusGenRootTypes['User']> => {
      const user = dataSources.userAPI.signUp(
        signUpUser,
      );
      return user;
    },
    signInEmail: (
      _:void,
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
