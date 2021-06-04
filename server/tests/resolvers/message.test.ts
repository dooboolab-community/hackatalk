import {GraphQLClient, request} from 'graphql-request';
import {
  createChannel,
  createMessage,
  messageQuery,
  messagesQuery,
  signInEmailMutation,
  signUpMutation,
} from '../queries';

import {testHost} from '../testSetup';

describe('Resolver - Channel', () => {
  let authClient: GraphQLClient;

  beforeAll(async () => {
    const signUpVar = {
      user: {
        name: 'unique_tester',
        email: 'tester@dooboolab.com',
        password: 'password',
        gender: 'male',
      },
    };

    const signInVar = {
      email: 'tester@dooboolab.com',
      password: 'password',
    };

    const signUpResponse = await request(testHost, signUpMutation, signUpVar);

    expect(signUpResponse).toHaveProperty('signUp');
    expect(signUpResponse.signUp).toHaveProperty('email');
    expect(signUpResponse.signUp.email).toEqual(signUpVar.user.email);

    const signInResponse = await request(
      testHost,
      signInEmailMutation,
      signInVar,
    );

    expect(signInResponse).toHaveProperty('signInEmail');
    expect(signInResponse.signInEmail).toHaveProperty('token');
    expect(signInResponse.signInEmail).toHaveProperty('user');
    expect(signInResponse.signInEmail.user.email).toEqual(signInVar.email);

    authClient = new GraphQLClient(testHost, {
      headers: {
        authorization: signInResponse.signInEmail.token,
      },
    });
  });

  const friendsId = [];

  it('should add more users', async () => {
    const signUpVar1 = {
      user: {
        name: 'another_tester_01',
        email: 'another1@dooboolab.com',
        password: 'password',
        gender: 'male',
      },
    };

    const signUpResponse1 = await request(testHost, signUpMutation, signUpVar1);

    expect(signUpResponse1).toHaveProperty('signUp');
    expect(signUpResponse1.signUp).toHaveProperty('email');
    expect(signUpResponse1.signUp.email).toEqual(signUpVar1.user.email);

    friendsId.push(signUpResponse1.signUp.id);

    const signUpVar2 = {
      user: {
        name: 'another_tester_02',
        email: 'another2@dooboolab.com',
        password: 'password',
        gender: 'male',
      },
    };

    const signUpResponse2 = await request(testHost, signUpMutation, signUpVar2);

    expect(signUpResponse2).toHaveProperty('signUp');
    expect(signUpResponse2.signUp).toHaveProperty('email');
    expect(signUpResponse2.signUp.email).toEqual(signUpVar2.user.email);

    friendsId.push(signUpResponse2.signUp.id);
  });

  let createdChannelId: string;

  it('should create channel without message', async () => {
    const variables = {
      channel: {
        userIds: [friendsId[0]],
      },
    };

    const response = await authClient.request(createChannel, variables);

    expect(response).toHaveProperty('createChannel');
    expect(response.createChannel).toHaveProperty('id');

    createdChannelId = response.createChannel.id;
  });

  let messageId;

  it('should createMessage in channel', async () => {
    const variables = {
      channelId: createdChannelId,
      message: {
        text: 'hellooo',
      },
      deviceKey: 'unique',
    };

    const response = await authClient.request(createMessage, variables);

    expect(response).toHaveProperty('createMessage');
    expect(response.createMessage).toHaveProperty('id');
    expect(response.createMessage).toHaveProperty('text');

    messageId = response.createMessage.id;
  });

  it('should query messages in channel', async () => {
    const variables = {
      first: 10,
      channelId: createdChannelId,
    };

    const response = await authClient.request(messagesQuery, variables);

    expect(response).toHaveProperty('messages');
    expect(response.messages).toHaveProperty('edges');
  });

  it('should query message itself', async () => {
    const variables = {
      id: messageId,
    };

    const response = await authClient.request(messageQuery, variables);

    expect(response).toHaveProperty('message');
    expect(response.message).toHaveProperty('id');
  });
});
