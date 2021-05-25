/* eslint-disable no-shadow */
import {GraphQLClient, request} from 'graphql-request';
import {apolloClient, testHost} from '../testSetup';
import {
  findPasswordMutation,
  meQuery,
  signInEmailMutation,
  signUpMutation,
  updateProfileMutation,
  userSignedInSubscription,
  userUpdatedSubscription,
} from '../queries';

import {ErrorString} from '../../src/utils/error';

let client: GraphQLClient;

const userVariables = {
  user: {
    name: 'dooboo1',
    email: 'dooboo@dooboolab.com',
    password: 'password',
    gender: 'male',
  },
};

const userVariables2 = {
  user: {
    name: 'clark',
    email: 'clark@dooboolab.com',
    password: 'password',
    gender: 'male',
  },
};

describe('Resolver - User', () => {
  it('should signUp user', async () => {
    const response = await request(testHost, signUpMutation, userVariables);

    expect(response).toHaveProperty('signUp');
    expect(response.signUp).toHaveProperty('email');
    expect(response.signUp.email).toEqual(userVariables.user.email);
  });

  it('should signIn user with email', async () => {
    const variables = {
      email: 'dooboo@dooboolab.com',
      password: 'password',
    };

    const response = await request(testHost, signInEmailMutation, variables);

    expect(response).toHaveProperty('signInEmail');
    expect(response.signInEmail).toHaveProperty('token');
    expect(response.signInEmail).toHaveProperty('user');
    expect(response.signInEmail.user.email).toEqual(variables.email);

    // hyochan => Setup auth client for next test case
    client = new GraphQLClient(testHost, {
      headers: {
        authorization: response.signInEmail.token,
      },
    });
  });

  it('should throw error when it requests findPassword', async () => {
    const variableNotExist = {
      email: 'notexistuser@email.com',
    };

    try {
      await client.request(findPasswordMutation, variableNotExist);
    } catch (e) {
      const response = e.response;

      expect(response.errors[0].message).toEqual(ErrorString.UserNotExists);
    }

    const variableNotValid = {
      email: 'notvaliduser@email',
    };

    try {
      await client.request(findPasswordMutation, variableNotValid);
    } catch (e) {
      const response = e.response;

      expect(response.errors[0].message).toEqual(ErrorString.EmailNotValid);
    }

    const variableValidUser = {
      email: userVariables.user.email,
    };

    try {
      await client.request(findPasswordMutation, variableValidUser);
    } catch (e) {
      const response = e.response;

      expect(response.errors[0].message).toEqual(ErrorString.EmailSentFailed);
    }
  });

  // Hyo => https://github.com/apollographql/subscriptions-transport-ws/issues/872

  // describe('Resolver - after signInEmail', () => {
  //   const variables = {
  //     user: {
  //       name: 'HelloBro',
  //       gender: 'male',
  //     },
  //   };

  //   it('should update user profile', async () => {
  //     const response = await client.request(updateProfileMutation, variables);

  //     expect(response).toHaveProperty('updateProfile');
  //     expect(response.updateProfile).toHaveProperty('name');
  //     expect(response.updateProfile).toHaveProperty('gender');
  //     expect(response.updateProfile.name).toEqual(variables.user.name);
  //     expect(response.updateProfile.gender).toEqual(variables.user.gender);
  //   });

  //   it('should throw error when invalid gender value is given', async () => {
  //     const invalidVars = {
  //       user: {
  //         name: 'HelloBro',
  //         gender: 'Woman',
  //       },
  //     };

  //     expect(async () => {
  //       await client.request(updateProfileMutation, invalidVars);
  //     }).rejects.toThrow();
  //   });

  //   it('should query me and get updated name', async () => {
  //     const response = await client.request(meQuery);

  //     expect(response).toHaveProperty('me');
  //     expect(response.me.name).toEqual(variables.user.name);
  //   });
  // });

  // describe('Resolver - user Subscription', () => {
  //   it("should subscribe 'userSignedIn' after 'signUp' mutation", async () => {
  //     let subscriptionValue;
  //     const response = await request(testHost, signUpMutation, userVariables2);

  //     expect(response.signUp.name).toEqual(userVariables2.user.name);
  //     expect(response.signUp.gender).toEqual(userVariables2.user.gender);

  //     apolloClient
  //       .subscribe({
  //         context: {
  //           headers: {
  //             authorization: response.token,
  //           },
  //         },
  //         query: userSignedInSubscription,
  //       })
  //       .subscribe({
  //         next: ({data}) => {
  //           return (subscriptionValue = data.userSignedIn);
  //         },
  //       });

  //     const variables = {
  //       email: 'clark@dooboolab.com',
  //       password: 'password',
  //     };

  //     const responseSignIn = await request(
  //       testHost,
  //       signInEmailMutation,
  //       variables,
  //     );

  //     expect(responseSignIn).toHaveProperty('signInEmail');
  //     expect(responseSignIn.signInEmail).toHaveProperty('token');
  //     expect(responseSignIn.signInEmail).toHaveProperty('user');
  //   });

  //   it("should subscribe 'userUpdated' after 'updateProfile' mutation", async () => {
  //     let subscriptionValue;

  //     const variables = {
  //       email: 'clark@dooboolab.com',
  //       password: 'password',
  //     };

  //     const response = await request(testHost, signInEmailMutation, variables);

  //     expect(response.signInEmail).toHaveProperty('user');

  //     apolloClient
  //       .subscribe({
  //         context: {
  //           headers: {
  //             authorization: response.token,
  //           },
  //         },
  //         query: userUpdatedSubscription,
  //       })
  //       .subscribe({
  //         next: ({data}) => {
  //           return (subscriptionValue = data.userUpdated);
  //         },
  //       });

  //     client = new GraphQLClient(testHost, {
  //       headers: {
  //         authorization: response.signInEmail.token,
  //       },
  //     });

  //     const variables2 = {
  //       user: {
  //         name: 'HelloBro',
  //         gender: 'female',
  //       },
  //     };

  //     const responseUpdateProfile = await client.request(
  //       updateProfileMutation,
  //       variables2,
  //     );

  //     expect(responseUpdateProfile).toHaveProperty('updateProfile');
  //     expect(responseUpdateProfile.updateProfile).toHaveProperty('name');
  //     expect(responseUpdateProfile.updateProfile).toHaveProperty('gender');
  //   });
  // });
});
