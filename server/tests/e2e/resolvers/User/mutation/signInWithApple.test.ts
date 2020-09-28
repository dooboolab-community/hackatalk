import * as AuthUtils from '../../../../../src/utils/auth';

import { request } from 'graphql-request';
import { signInWithApple } from '../../../setup/queries';
import { testHost } from '../../../setup/testSetup';

describe('signInWithApple', () => {
  it('should signIn user wigh Apple', async () => {
    const variables = {
      accessToken: 'apple_user_token',
    };

    jest
      .spyOn(AuthUtils, 'verifyAppleId')
      // @ts-ignore
      .mockImplementation(() => Promise.resolve({
        sub: 'apple_user_token',
        email: 'apple@email.com',
      }));

    const response = await request(testHost, signInWithApple, variables);
    expect(response).toHaveProperty('signInWithApple');
    expect(response.signInWithApple).toHaveProperty('token');
    expect(response.signInWithApple).toHaveProperty('user');
    expect(response.signInWithApple.user.email).toEqual('apple@email.com');
  });
});
