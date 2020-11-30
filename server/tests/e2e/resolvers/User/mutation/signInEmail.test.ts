import { signInEmailMutation, signUpMutation } from '../../../queries';

import { request } from 'graphql-request';
import { testHost } from '../../../testSetup';

describe('signInEmail', () => {
  it('should throw error when user does not exists', async () => {
    const variables = {
      email: 'testtest@test.com',
      password: 'password',
    };

    const promise = request(testHost, signInEmailMutation, variables);
    expect(promise).rejects.toThrow();
  });

  it('should throw error when password is invalid', async () => {
    const userVariables = {
      user: {
        name: 'dooboo1',
        email: 'doobooaccount@dooboolab.com',
        password: 'password',
        gender: 'male',
      },
    };

    await request(testHost, signUpMutation, userVariables);

    const variables = {
      email: userVariables.user.email,
      password: 'invalid',
    };

    const promise = request(testHost, signInEmailMutation, variables);
    expect(promise).rejects.toThrow();
  });
});