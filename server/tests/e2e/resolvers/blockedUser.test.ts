import { GraphQLClient, request } from 'graphql-request';
import {
  addBlockedUserMutation,
  deleteBlockedUserMutation,
  signInEmailMutation,
  signUpMutation,
} from '../setup/queries';

import { testHost } from '../setup/testSetup';

describe('Resolver - Friend', () => {
  it('scenario test', async () => {
    // signUp
    const signUpVar = {
      user: {
        name: 'unique_tester',
        email: 'tester@dooboolab.com',
        password: 'password',
        gender: 'male',
      },
    };

    const signUpResponse = await request(testHost, signUpMutation, signUpVar);

    expect(signUpResponse).toHaveProperty('signUp');
    expect(signUpResponse.signUp).toHaveProperty('email');
    expect(signUpResponse.signUp.email).toEqual(signUpVar.user.email);

    // signIn
    const signInVar = {
      email: 'tester@dooboolab.com',
      password: 'password',
    };

    const signInResponse = await request(testHost, signInEmailMutation, signInVar);

    expect(signInResponse).toHaveProperty('signInEmail');
    expect(signInResponse.signInEmail).toHaveProperty('token');
    expect(signInResponse.signInEmail).toHaveProperty('user');
    expect(signInResponse.signInEmail.user.email).toEqual(signInVar.email);

    const authClient = new GraphQLClient(testHost, {
      headers: {
        authorization: signInResponse.signInEmail.token,
      },
    });

    // signUp - future blockedUser
    const signUpFriendVar = {
      user: {
        name: 'another_tester',
        email: 'another1@dooboolab.com',
        password: 'password',
        gender: 'male',
      },
    };

    const signUpFriendResponse = await request(testHost, signUpMutation, signUpFriendVar);

    expect(signUpFriendResponse).toHaveProperty('signUp');
    expect(signUpFriendResponse.signUp).toHaveProperty('email');
    expect(signUpFriendResponse.signUp.email).toEqual(signUpFriendVar.user.email);

    const blockedUserId = signUpFriendResponse.signUp.id;

    // should add blockedUser
    const addBlockedUserResponse = await authClient.request(addBlockedUserMutation, { blockedUserId });

    expect(addBlockedUserResponse).toHaveProperty('addBlockedUser');
    expect(addBlockedUserResponse.addFriend).toHaveProperty('user');
    expect(addBlockedUserResponse.addFriend).toHaveProperty('blockedUser');

    // should delete blockedUser
    const deleteBlockedUserResponse = await authClient.request(deleteBlockedUserMutation, { blockedUserId });

    expect(deleteBlockedUserResponse).toHaveProperty('deleteBlockedUser');
    expect(deleteBlockedUserResponse.deleteFriend).toHaveProperty('user');
    expect(deleteBlockedUserResponse.deleteFriend).toHaveProperty('blockedUser');
  });
});
