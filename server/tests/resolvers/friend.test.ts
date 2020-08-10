import { GraphQLClient, request } from 'graphql-request';
import {
  addFriendMutation,
  deleteFriendMutation,
  signInEmailMutation,
  signUpMutation,
} from '../setup/queries';

import { testHost } from '../setup/testSetup';

describe('Resolver - Friend', () => {
  let authClient: GraphQLClient;

  beforeAll(async () => {
    const signUpVar = {
      user: {
        name: 'unique_tester',
        email: 'tester@dooboolab.com',
        password: 'password',
        gender: 'male',
      },
    };

    const signInVar = {
      email: 'tester@dooboolab.com',
      password: 'password',
    };

    const signUpResponse = await request(testHost, signUpMutation, signUpVar);

    expect(signUpResponse).toHaveProperty('signUp');
    expect(signUpResponse.signUp).toHaveProperty('email');
    expect(signUpResponse.signUp.email).toEqual(signUpVar.user.email);

    const signInResponse = await request(testHost, signInEmailMutation, signInVar);
    expect(signInResponse).toHaveProperty('signInEmail');
    expect(signInResponse.signInEmail).toHaveProperty('token');
    expect(signInResponse.signInEmail).toHaveProperty('user');
    expect(signInResponse.signInEmail.user.email).toEqual(signInVar.email);

    authClient = new GraphQLClient(testHost, {
      headers: {
        authorization: signInResponse.signInEmail.token,
      },
    });
  });

  let friendId;

  it('should add more users', async () => {
    const signUpVar = {
      user: {
        name: 'another_tester',
        email: 'another1@dooboolab.com',
        password: 'password',
        gender: 'male',
      },
    };

    const signUpResponse = await request(testHost, signUpMutation, signUpVar);

    expect(signUpResponse).toHaveProperty('signUp');
    expect(signUpResponse.signUp).toHaveProperty('email');
    expect(signUpResponse.signUp.email).toEqual(signUpVar.user.email);

    friendId = signUpResponse.signUp.id;
  });

  it('should add friend', async () => {
    const variables = {
      friendId,
    };

    const response = await authClient.request(addFriendMutation, variables);
    expect(response).toHaveProperty('addFriend');
    expect(response.addFriend).toHaveProperty('user');
    expect(response.addFriend).toHaveProperty('friend');
  });

  it('should delete friend', async () => {
    const variables = {
      friendId,
    };

    const response = await authClient.request(deleteFriendMutation, variables);
    expect(response).toHaveProperty('deleteFriend');
    expect(response.deleteFriend).toHaveProperty('user');
    expect(response.deleteFriend).toHaveProperty('friend');
  });
});
