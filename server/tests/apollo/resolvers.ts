import { Context, SignUpInput, SignUpResponse, User } from './types';

import { IResolvers } from 'apollo-server';

const resolvers: IResolvers = {
  Query: {
    users: (_: void, __: void, { dataSources }: Context): Promise<User[]> =>
      dataSources.userAPI.users(),
  },
  Mutation: {
    signUp: (
      _: void,
      { signUpInput }: SignUpInput,
      { dataSources }: Context,
    ): SignUpResponse => {
      const user = dataSources.userAPI.signUp(signUpInput);
      return { user };
    },
  },
};

export default resolvers;
