import * as AuthUtils from '../../../../src/utils/auth';

import { request } from 'graphql-request';
import { signInWithGoogle } from '../../queries';
import { testHost } from '../../testSetup';

describe('signInWithGoogle', () => {
  it('should signIn user wigh Google', async () => {
    const variables = {
      accessToken: 'google_user_token',
    };

    jest
      .spyOn(AuthUtils, 'verifyGoogleId')
      // @ts-ignore
      .mockImplementation(() => Promise.resolve({
        sub: 'google_user_token',
        email: 'google@email.com',
      }));

    const response = await request(testHost, signInWithGoogle, variables);

    expect(response).toHaveProperty('signInWithGoogle');
    expect(response.signInWithGoogle).toHaveProperty('token');
    expect(response.signInWithGoogle).toHaveProperty('user');
    expect(response.signInWithGoogle.user.email).toEqual('google@email.com');
  });
});
