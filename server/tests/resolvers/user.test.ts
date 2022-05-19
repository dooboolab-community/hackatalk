/* eslint-disable no-shadow */
import {
  findPasswordMutation,
  signInEmailMutation,
  signUpMutation,
} from '../queries';

import {ErrorString} from '../../src/utils/error';
import {getTestUtils} from '../testUtils';
import i18next from 'i18next';

const userVariables = {
  user: {
    name: 'dooboo1',
    email: 'dooboo@dooboolab.com',
    password: 'password',
    gender: 'male',
  },
};

describe('Resolver - User', () => {
  it('should signUp user', async () => {
    const {graphqlClient} = getTestUtils();
    const response = await graphqlClient.request(signUpMutation, userVariables);

    expect(response).toHaveProperty('signUp');
    expect(response.signUp).toHaveProperty('email');
    expect(response.signUp.email).toEqual(userVariables.user.email);
  });

  it('should signIn user with email', async () => {
    const {graphqlClient, setAuthToken} = getTestUtils();

    const variables = {
      email: 'dooboo@dooboolab.com',
      password: 'password',
    };

    const response = await graphqlClient.request(
      signInEmailMutation,
      variables,
    );

    expect(response).toHaveProperty('signInEmail');
    expect(response.signInEmail).toHaveProperty('token');
    expect(response.signInEmail).toHaveProperty('user');
    expect(response.signInEmail.user.email).toEqual(variables.email);

    // hyochan => Setup auth client for next test case
    setAuthToken(response.signInEmail.token);
  });

  it('should throw error when it requests findPassword', async () => {
    const {graphqlClient} = getTestUtils();

    const variableNotExist = {
      email: 'notexistuser@email.com',
    };

    try {
      await graphqlClient.request(findPasswordMutation, variableNotExist);
    } catch (e) {
      const response = e.response;

      expect(response.errors[0].message).toEqual(
        i18next.t(ErrorString.UserNotExists),
      );
    }

    const variableNotValid = {
      email: 'notvaliduser@email',
    };

    try {
      await graphqlClient.request(findPasswordMutation, variableNotValid);
    } catch (e) {
      const response = e.response;

      expect(response.errors[0].message).toEqual(
        i18next.t(ErrorString.EmailNotValid),
      );
    }

    const variableValidUser = {
      email: userVariables.user.email,
    };

    try {
      await graphqlClient.request(findPasswordMutation, variableValidUser);
    } catch (e) {
      const response = e.response;

      expect(response.errors[0].message).toEqual(
        i18next.t(ErrorString.EmailSentFailed),
      );
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
