import { GraphQLClient, request } from 'graphql-request';
import {
  createChannel,
  inviteToChannel,
  sendMessage,
  signInEmailMutation,
  signUpMutation,
} from '../setup/queries';
import { testHost } from '../setup/testSetup';

describe('Resolver - Message', () => {
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

  it('should invite some users into a channel', async () => {
    const usersToInvite = userIds.splice(1);
    const variables = {
      channelId: channelIds[0],
      userIds: usersToInvite,
    };

    const response = await authClients[0].request(inviteToChannel, variables);

    expect(response).toHaveProperty('inviteUsersToChannel');
    expect(response.inviteUsersToChannel).toHaveProperty('memberships');
  });

  it('should able to send a message', async () => {
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
    expect(response.sendMessage).toHaveProperty('sender');
    expect(response.sendMessage).toHaveProperty('channel');
    expect(response.sendMessage).toHaveProperty('text');
    expect(response.sendMessage).toHaveProperty('messageType');
    expect(response.sendMessage.text).toEqual(variables.message.text);
    expect(response.sendMessage.messageType).toEqual(variables.message.messageType);
    expect(response.sendMessage.channel).toHaveProperty('id');
    expect(response.sendMessage.channel.id).toEqual(channelIds[0]);
    expect(response.sendMessage.sender).toHaveProperty('id');
    expect(response.sendMessage.sender.id).toEqual(userIds[0]);
  });

  it('should throw when trying to send a message to invalid channel', async () => {
    const variables = {
      channelId: '_', // Invalid channel id
      message: {
        messageType: 'text',
        text: 'lorem ipsum',
      },
    };

    const response = authClients[0].request(sendMessage, variables);
    expect(response).rejects.toThrow();
  });

  it('should throw when trying to send a message to channel not entered', async () => {
    const variables = {
      channelId: channelIds[1],
      message: {
        messageType: 'text',
        text: 'lorem ipsum',
      },
    };

    const response = authClients[0].request(sendMessage, variables);
    expect(response).rejects.toThrow();
  });
});
