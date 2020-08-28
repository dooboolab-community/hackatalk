import { User } from '../types';
import UserAPI from '../UserAPI';
import gql from 'graphql-tag';
import testServer from '../testUtils/testServer';
import { userSample } from '../testUtils/userSample';

describe('resolvers', () => {
  it('users query', async () => {
    const userAPI: any = new UserAPI();

    const getStub = (): Promise<User[]> => Promise.resolve(userSample());
    userAPI.get = jest.fn(getStub);

    const { query } = testServer(() => ({ userAPI }));

    const USERS = gql`
      query Users {
        users {
          id
          email
          name
        }
      }
    `;

    const res = await query({ query: USERS });
    expect(res.errors).toBe(undefined);
    expect(userAPI.get).toHaveBeenCalledWith('users');
  });

  it('signUp mutation', async () => {
    const userAPI: any = new UserAPI();

    const newUser = {
      email: 'jessie@dooboolab.com',
      password: 'jessie123!',
      name: 'jessie',
    };

    const updatedUser = {
      ...userSample(),
      id: '3',
      ...newUser,
    };

    userAPI.post = jest.fn(() => Promise.resolve(updatedUser));

    const { mutate } = testServer(() => ({ userAPI }));

    const SIGN_UP = gql`
      mutation signUp($user: UserCreateInput) {
        signUp(user: $user) {
          id
          name
          password
          email
        }
      }
    `;

    const res = await mutate({
      mutation: SIGN_UP,
      variables: { newUser },
    });

    expect(res.errors).toBe(undefined);
  });
});
