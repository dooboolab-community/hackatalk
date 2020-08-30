import { GraphQLClient, request } from 'graphql-request';
import {
  createChannel,
  inviteToChannel,
  sendMessage,
  sendReply,
  signInEmailMutation,
  signUpMutation,
} from '../setup/queries';
import { testHost } from '../setup/testSetup';

describe('Resolver - Reply', () => {
  const authClients: GraphQLClient[] = [];
  const userIds: string[] = [];

  interface signUpVariable {
      user: {
        name: string;
        email: string;
        password: string;
        gender: string;
      }
  }

  const signUp = async (signUpVariable: signUpVariable) => {
    const signUpResponse = await request(testHost, signUpMutation, signUpVariable);

    expect(signUpResponse).toHaveProperty('signUp');
    expect(signUpResponse.signUp).toHaveProperty('email');
    expect(signUpResponse.signUp.email).toEqual(signUpVariable.user.email);

    const signInVariable = {
      email: signUpVariable.user.email,
      password: signUpVariable.user.password,
    };

    const signInResponse = await request(testHost, signInEmailMutation, signInVariable);
    expect(signInResponse).toHaveProperty('signInEmail');
    expect(signInResponse.signInEmail).toHaveProperty('token');
    expect(signInResponse.signInEmail).toHaveProperty('user');
    expect(signInResponse.signInEmail.user.email).toEqual(signInVariable.email);

    authClients.push(new GraphQLClient(testHost, {
      headers: {
        authorization: signInResponse.signInEmail.token,
      },
    }));
    userIds.push(signUpResponse.signUp.id);
  };

  beforeAll(async () => {
    await signUp({
      user: {
        name: 'unique_tester',
        email: 'tester@dooboolab.com',
        password: 'password',
        gender: 'male',
      },
    });
  });

  it('should add more users', async () => {
    await signUp({
      user: {
        name: 'another_tester_01',
        email: 'another1@dooboolab.com',
        password: 'password',
        gender: 'male',
      },
    });
    await signUp({
      user: {
        name: 'another_tester_02',
        email: 'another2@dooboolab.com',
        password: 'password',
        gender: 'male',
      },
    });
    expect(authClients).toHaveLength(3);
    expect(userIds).toHaveLength(3);
  });

  const channelIds: string[] = [];

  it('should create some channels', async () => {
    const variables = {
      channel: {
        channelType: 'public',
      },
    };

    for (const authClient of authClients.slice(0, 2)) {
      const response = await authClient.request(createChannel, variables);
      expect(response).toHaveProperty('createChannel');
      expect(response.createChannel).toHaveProperty('id');

      channelIds.push(response.createChannel.id);
    }
  });

  const messageIds : string[] = [];
  it('should send some messages', async () => {
    const variables = {
      channelId: channelIds[0],
      message: {
        messageType: 'text',
        text: 'lorem ipsum',
      },
    };

    const response = await authClients[0].request(sendMessage, variables);
    expect(response).toHaveProperty('sendMessage');
    expect(response.sendMessage).toHaveProperty('id');
    messageIds.push(response.sendMessage.id);
  });

  it('should reply to their message', async () => {
    const variables = {
      messageId: messageIds[0],
      message: {
        messageType: 'text',
        text: 'lorem ipsum',
      },
    };

    const response = await authClients[0].request(sendReply, variables);
    expect(response).toHaveProperty('sendReply');
    expect(response.sendReply).toHaveProperty('id');
    expect(response.sendReply).toHaveProperty('sender');
    expect(response.sendReply).toHaveProperty('text');
    expect(response.sendReply).toHaveProperty('messageType');
    expect(response.sendReply.text).toEqual(variables.message.text);
    expect(response.sendReply.messageType).toEqual(variables.message.messageType);
    expect(response.sendReply.sender).toHaveProperty('id');
    expect(response.sendReply.sender.id).toEqual(userIds[0]);
  });
});
