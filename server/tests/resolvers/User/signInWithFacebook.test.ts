import * as AuthUtils from '../../../src/utils/auth';

import {request} from 'graphql-request';
import {signInWithFacebook} from '../../queries';
import {testHost} from '../../testSetup';

describe('signInWithFacebook', () => {
  it('should signIn user wigh Facebook', async () => {
    const variables = {
      accessToken: 'facebook_user_token',
    };

    jest.spyOn(AuthUtils, 'verifyFacebookId').mockImplementation(() =>
      // @ts-ignore
      Promise.resolve({
        id: 'facebook_user_id',
        name: 'userName',
        email: 'facebook@email.com',
        picture: {
          data: 'http://image.com',
        },
      } as AuthUtils.FacebookUser),
    );

    const response = await request(testHost, signInWithFacebook, variables);

    expect(response).toHaveProperty('signInWithFacebook');
    expect(response.signInWithFacebook).toHaveProperty('token');
    expect(response.signInWithFacebook).toHaveProperty('user');

    expect(response.signInWithFacebook.user.email).toEqual(
      'facebook@email.com',
    );
  });
});
