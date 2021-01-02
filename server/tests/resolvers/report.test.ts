import { GraphQLClient, request } from 'graphql-request';
import {
  createReportMutation,
  signInEmailMutation,
  signUpMutation,
} from '../queries';

import sgMail from '@sendgrid/mail';
import { testHost } from '../testSetup';

describe('Resolver - Report', () => {
  it('scenario test', async () => {
    jest
      .spyOn(sgMail, 'send')
      // @ts-ignore
      .mockImplementation(() => Promise.resolve(true));

    // signUp
    const signUpVar = {
      user: {
        name: 'unique_tester',
        email: 'tester@dooboolab.com',
        password: 'password',
        gender: 'male',
      },
    };

    const signUpResponse = await request(testHost, signUpMutation, signUpVar);

    expect(signUpResponse).toHaveProperty('signUp');
    expect(signUpResponse.signUp).toHaveProperty('email');
    expect(signUpResponse.signUp.email).toEqual(signUpVar.user.email);

    // signIn
    const signInVar = {
      email: 'tester@dooboolab.com',
      password: 'password',
    };

    const signInResponse = await request(
      testHost,
      signInEmailMutation,
      signInVar,
    );

    expect(signInResponse).toHaveProperty('signInEmail');
    expect(signInResponse.signInEmail).toHaveProperty('token');
    expect(signInResponse.signInEmail).toHaveProperty('user');
    expect(signInResponse.signInEmail.user.email).toEqual(signInVar.email);

    const authClient = new GraphQLClient(testHost, {
      headers: {
        authorization: signInResponse.signInEmail.token,
      },
    });

    // signUp - future reportedUser
    const signUpUserVar = {
      user: {
        name: 'another_tester',
        email: 'another1@dooboolab.com',
        password: 'password',
        gender: 'male',
      },
    };

    const signUpUserResponse = await request(
      testHost,
      signUpMutation,
      signUpUserVar,
    );

    expect(signUpUserResponse).toHaveProperty('signUp');
    expect(signUpUserResponse.signUp).toHaveProperty('email');
    expect(signUpUserResponse.signUp.email).toEqual(signUpUserVar.user.email);

    const reportedUserId = signUpUserResponse.signUp.id;

    // should create report
    const createReportResponse = await authClient.request(
      createReportMutation,
      { reportedUserId, report: 'I want to report him' },
    );

    expect(createReportResponse).toHaveProperty('createReport');
    expect(createReportResponse.createReport).toHaveProperty('user');
    expect(createReportResponse.createReport).toHaveProperty('reportedUser');
  });
});
