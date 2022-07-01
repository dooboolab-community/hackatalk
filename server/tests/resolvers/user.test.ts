/* eslint-disable no-shadow */
import {
  deleteUserMutation,
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
    } catch (e: any) {
      const response = e.response;

      // eslint-disable-next-line jest/no-conditional-expect
      expect(response.errors[0].message).toEqual(
        i18next.t(ErrorString.UserNotExists),
      );
    }

    const variableNotValid = {
      email: 'notvaliduser@email',
    };

    try {
      await graphqlClient.request(findPasswordMutation, variableNotValid);
    } catch (e: any) {
      const response = e.response;

      // eslint-disable-next-line jest/no-conditional-expect
      expect(response.errors[0].message).toEqual(
        i18next.t(ErrorString.EmailNotValid),
      );
    }

    const variableValidUser = {
      email: userVariables.user.email,
    };

    try {
      await graphqlClient.request(findPasswordMutation, variableValidUser);
    } catch (e: any) {
      const response = e.response;

      // eslint-disable-next-line jest/no-conditional-expect
      expect(response.errors[0].message).toEqual(
        i18next.t(ErrorString.EmailSentFailed),
      );
    }
  });

  it('should remove user', async () => {
    const {graphqlClient, prisma} = getTestUtils();

    const user = await prisma.user.findUnique({
      where: {email: userVariables.user.email},
    });

    const response = await graphqlClient.request(deleteUserMutation, {
      id: user?.id,
    });

    expect(response.deleteUser).toBeTruthy();
  });
});
