import { request } from 'graphql-request';
import * as AuthUtils from '../../../../src/utils/auth';
import { signInWithFacebook } from '../../../setup/queries';
import { testHost } from '../../../setup/testSetup';

describe('signInWithFacebook', () => {
  it('should signIn user wigh Facebook', async () => {
    const variables = {
      accessToken: 'google_user_token',
    };

    jest
      .spyOn(AuthUtils, 'verifyFacebookId')
      // @ts-ignore
      .mockImplementation(() => Promise.resolve({
        id: 'facebook_user_id',
        email: 'facebook@email.com',
      }));

    const response = await request(testHost, signInWithFacebook, variables);
    expect(response).toHaveProperty('signInWithFacebook');
    expect(response.signInWithFacebook).toHaveProperty('token');
    expect(response.signInWithFacebook).toHaveProperty('user');
    expect(response.signInWithFacebook.user.email).toEqual('facebook@email.com');
  });

});