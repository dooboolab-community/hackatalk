/* eslint-disable no-shadow */
import { GraphQLClient, request } from 'graphql-request';
import { apolloClient, testHost } from '../testSetup';
import {
  meQuery,
  signInEmailMutation,
  signUpMutation,
  updateProfileMutation,
  userSignedInSubscription,
  userUpdatedSubscription,
} from '../queries';

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

  describe('Resolver - after signInEmail', () => {
    const variables = {
      user: {
        name: 'HelloBro',
        gender: 'male',
      },
    };

    it('should update user profile', async () => {
      const response = await client.request(updateProfileMutation, variables);

      expect(response).toHaveProperty('updateProfile');
      expect(response.updateProfile).toHaveProperty('name');
      expect(response.updateProfile).toHaveProperty('gender');
      expect(response.updateProfile.name).toEqual(variables.user.name);
      expect(response.updateProfile.gender).toEqual(variables.user.gender);
    });

    it('should throw error when invalid gender value is given', async () => {
      const invalidVars = {
        user: {
          name: 'HelloBro',
          gender: 'Woman',
        },
      };

      expect(async () => {
        await client.request(updateProfileMutation, invalidVars);
      }).rejects.toThrow();
    });

    it('should query me and get updated name', async () => {
      const response = await client.request(meQuery);

      expect(response).toHaveProperty('me');
      expect(response.me.name).toEqual(variables.user.name);
    });
  });

  describe('Resolver - user Subscription', () => {
    it("should subscribe 'userSignedIn' after 'signUp' mutation", async () => {
      let subscriptionValue;
      const response1 = await request(testHost, signUpMutation, userVariables2);
      const userId = response1.signUp.id;

      expect(response1.signUp.name).toEqual(userVariables2.user.name);
      expect(response1.signUp.gender).toEqual(userVariables2.user.gender);

      apolloClient
        .subscribe({
          query: userSignedInSubscription,
          variables: { userId: userId },
        })
        .subscribe({
          next: ({ data }) => {
            return (subscriptionValue = data.userSignedIn);
          },
        });

      const variables = {
        email: 'clark@dooboolab.com',
        password: 'password',
      };

      const response2 = await request(testHost, signInEmailMutation, variables);

      expect(response2).toHaveProperty('signInEmail');
      expect(response2.signInEmail).toHaveProperty('token');
      expect(response2.signInEmail).toHaveProperty('user');
      expect(response2.signInEmail.user.id).toEqual(subscriptionValue.id);
      expect(response2.signInEmail.user.email).toEqual(subscriptionValue.email);
      expect(response2.signInEmail.user.name).toEqual(subscriptionValue.name);

      expect(response2.signInEmail.user.gender).toEqual(
        subscriptionValue.gender,
      );

      expect(response2.signInEmail.user.createdAt).toEqual(
        subscriptionValue.createdAt,
      );
    });

    it("should subscribe 'userUpdated' after 'updateProfile' mutation", async () => {
      let subscriptionValue;

      const variables = {
        email: 'clark@dooboolab.com',
        password: 'password',
      };

      const response = await request(testHost, signInEmailMutation, variables);

      expect(response.signInEmail).toHaveProperty('user');

      const userId = response.signInEmail.user.id;

      apolloClient
        .subscribe({
          query: userUpdatedSubscription,
          variables: { userId: userId },
        })
        .subscribe({
          next: ({ data }) => {
            return (subscriptionValue = data.userUpdated);
          },
        });

      client = new GraphQLClient(testHost, {
        headers: {
          authorization: response.signInEmail.token,
        },
      });

      const variables2 = {
        user: {
          name: 'HelloBro',
          gender: 'female',
        },
      };

      const response2 = await client.request(updateProfileMutation, variables2);

      expect(response2).toHaveProperty('updateProfile');
      expect(response2.updateProfile).toHaveProperty('name');
      expect(response2.updateProfile).toHaveProperty('gender');
      expect(variables2.user.name).toEqual(subscriptionValue.name);
      expect(response2.updateProfile.name).toEqual(subscriptionValue.name);
      expect(variables2.user.gender).toEqual(subscriptionValue.gender);
      expect(response2.updateProfile.gender).toEqual(subscriptionValue.gender);
    });
  });
});
