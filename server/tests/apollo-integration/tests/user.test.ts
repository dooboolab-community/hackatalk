import { authPayload, user } from '../data';

import { NexusGenRootTypes } from '../../../src/generated/nexus';
import UserAPI from '../apis/UserAPI';
/* eslint-disable @typescript-eslint/no-explicit-any */
import gql from 'graphql-tag';
import testServer from '../setup/testServer';
import { userResolvers } from '../setup/resolvers';

describe('user resolvers', () => {
  it('me query', async () => {
    const userAPI: any = new UserAPI();

    const getStub = (): Promise<NexusGenRootTypes['User']> =>
      Promise.resolve(user());

    userAPI.get = jest.fn(getStub);

    const { query } = testServer(() => ({ userAPI }), userResolvers);

    const ME = gql`
      query me {
        me {
          id
        }
      }
    `;

    const res = await query({ query: ME });
    expect(res.errors).toBe(undefined);
    expect(userAPI.get).toHaveBeenCalledWith('user');
  });

  it('signUp mutation', async () => {
    const userAPI: any = new UserAPI();

    const newUser = {
      email: 'jessie@hackatalk.com',
      password: 'jessie123!',
      name: 'jessie',
    };

    const updatedUser = {
      ...user(),
      id: '3',
      ...newUser,
    };

    userAPI.post = jest.fn(() =>
      Promise.resolve(updatedUser),
    );

    const { mutate } = testServer(() => ({ userAPI }), userResolvers);

    const SIGN_UP = gql`
      mutation signUp($user: UserCreateInput) {
        signUp(user: $user) {
          id
          name
        }
      }
    `;

    const res = await mutate({
      mutation: SIGN_UP,
      variables: { newUser },
    });

    expect(res.errors).toBe(undefined);
  });

  it('signInEmail mutation', async () => {
    const userAPI: any = new UserAPI();

    const user = (): Promise<NexusGenRootTypes['User']> =>
      Promise.resolve(user());

    userAPI.post = jest.fn(user);

    const payload = (): Promise<NexusGenRootTypes['AuthPayload']> =>
      Promise.resolve(authPayload());

    userAPI.post = jest.fn(payload);

    const { mutate } = testServer(() => ({ userAPI }), userResolvers);

    const signInUser = {
      email: 'jerry@dooboolab.com',
      password: 'jerry123!',
    };

    const SIGN_IN_EMAIL = gql`
      mutation signInEmail($email: String! $password: String!) {
        signInEmail(email: $email, password: $password) {
          token
          user {
            id
            name
            email
          }
        }
      }
    `;

    const res = await mutate({
      mutation: SIGN_IN_EMAIL,
      variables: signInUser,
    });
    expect(res.errors).toBe(undefined);
  });
});
