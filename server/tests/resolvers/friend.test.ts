import {GraphQLClient, request} from 'graphql-request';
import {
  addFriendMutation,
  deleteFriendMutation,
  signInEmailMutation,
  signUpMutation,
} from '../queries';

import {testHost} from '../testSetup';

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

    // signUp - friend
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

    const friendId = signUpFriendResponse.signUp.id;

    // should add friend
    const addFriendResponse = await authClient.request(addFriendMutation, {
      friendId,
    });

    expect(addFriendResponse).toHaveProperty('addFriend');
    expect(addFriendResponse.addFriend).toHaveProperty('user');
    expect(addFriendResponse.addFriend).toHaveProperty('friend');

    // should delete friend
    const deleteFriendResponse = await authClient.request(
      deleteFriendMutation,
      {friendId},
    );

    expect(deleteFriendResponse).toHaveProperty('deleteFriend');
    expect(deleteFriendResponse.deleteFriend).toHaveProperty('user');
    expect(deleteFriendResponse.deleteFriend).toHaveProperty('friend');
  });
});
