import { GraphQLClient, request } from 'graphql-request';
import {
  createBlockedUserMutation,
  deleteBlockedUserMutation,
  signInEmailMutation,
  signUpMutation,
} from '../queries';

import { testHost } from '../testSetup';

describe('Resolver - BlockedUser', () => {
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

    const signInResponse = await request(
      testHost,
      signInEmailMutation,
      signInVar,
    );

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

    const signUpFriendResponse = await request(
      testHost,
      signUpMutation,
      signUpFriendVar,
    );

    expect(signUpFriendResponse).toHaveProperty('signUp');
    expect(signUpFriendResponse.signUp).toHaveProperty('email');

    expect(signUpFriendResponse.signUp.email).toEqual(
      signUpFriendVar.user.email,
    );

    const blockedUserId = signUpFriendResponse.signUp.id;

    // should add blockedUser
    const createBlockedUserResponse = await authClient.request(
      createBlockedUserMutation,
      { blockedUserId },
    );

    expect(createBlockedUserResponse).toHaveProperty('createBlockedUser');
    expect(createBlockedUserResponse.createBlockedUser).toHaveProperty('user');

    expect(createBlockedUserResponse.createBlockedUser).toHaveProperty(
      'blockedUser',
    );

    // should delete blockedUser
    const deleteBlockedUserResponse = await authClient.request(
      deleteBlockedUserMutation,
      { blockedUserId },
    );

    expect(deleteBlockedUserResponse).toHaveProperty('deleteBlockedUser');
    expect(deleteBlockedUserResponse.deleteBlockedUser).toHaveProperty('user');

    expect(deleteBlockedUserResponse.deleteBlockedUser).toHaveProperty(
      'blockedUser',
    );
  });
});
