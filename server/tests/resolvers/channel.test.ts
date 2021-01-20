import {GraphQLClient, request} from 'graphql-request';
import {
  channelQuery,
  channelsQuery,
  createChannel,
  findOrCreatePrivateChannel,
  inviteToChannel,
  kickFromChannel,
  leaveChannel,
  signInEmailMutation,
  signUpMutation,
} from '../queries';

import {testHost} from '../testSetup';

let authClient: GraphQLClient;

describe('Resolver - Channel', () => {
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
  const channels = [];

  it('should create [private] channel with message', async () => {
    const variables = {
      channel: {
        userIds: [friendsId[0]],
      },
      message: {
        text: 'Hello. How are you?',
      },
    };

    const response = await authClient.request(createChannel, variables);

    expect(response).toHaveProperty('createChannel');
    expect(response.createChannel).toHaveProperty('name');
    expect(response.createChannel).toHaveProperty('id');
    expect(response.createChannel).toHaveProperty('lastMessage');
    expect(response.createChannel).toHaveProperty('messages');
    expect(response.createChannel.messages).toHaveProperty('edges');

    createdChannelId = response.createChannel.id;

    // Add 1st to channels which will be tested at the end of insertion.
    channels.push(createdChannelId);
  });

  it('should not create [private] channel again of same user group', async () => {
    const messageTobeSent =
      'This will not create channelId but create another message.';

    const variables = {
      channel: {
        userIds: [friendsId[0]],
      },
      message: {
        text: messageTobeSent,
      },
    };

    const response = await authClient.request(createChannel, variables);

    expect(response).toHaveProperty('createChannel');
    expect(response.createChannel).toHaveProperty('id');
    expect(response.createChannel.lastMessage).toHaveProperty('text');
    expect(response.createChannel.id).toEqual(createdChannelId);
    expect(response.createChannel.lastMessage.text).toEqual(messageTobeSent);
  });

  it('should create new channel id when group of users are different in [private] channel', async () => {
    const variables = {
      channel: {
        userIds: [friendsId[0], friendsId[1]],
      },
    };

    const response = await authClient.request(createChannel, variables);

    expect(response).toHaveProperty('createChannel');
    expect(response.createChannel).toHaveProperty('id');
    expect(response.createChannel.id).not.toEqual(createdChannelId);

    // Add 2nd to channels which will be tested at the end of insertion.
    channels.push(response.createChannel.id);
  });

  it('should throw when user has no members to chat with in private channel', async () => {
    const variables = {
      channel: {
        userIds: [],
      },
    };

    const response = authClient.request(createChannel, variables);

    expect(response).rejects.toThrow();
  });

  it('should able to create channel without message', async () => {
    const variables = {
      channel: {
        userIds: [friendsId[0]],
      },
    };

    const response = await authClient.request(createChannel, variables);

    expect(response).toHaveProperty('createChannel');
    expect(response.createChannel).toHaveProperty('id');
  });

  it('should able to create [public] channel', async () => {
    const variables = {
      channel: {
        channelType: 'public',
      },
    };

    const response = await authClient.request(createChannel, variables);

    expect(response).toHaveProperty('createChannel');
    expect(response.createChannel).toHaveProperty('id');

    // Add 3rd to channels which will be tested at the end of insertion.
    channels.push(response.createChannel.id);
  });

  it('should query my channels which are newly inserted in above tests === 3', async () => {
    const response = await authClient.request(channelsQuery);

    expect(response).toHaveProperty('channels');
    expect(response.channels.edges).toHaveLength(3);
    expect(channels.length).toEqual(response.channels.edges.length);

    response.channels.edges.forEach((channelEdge) => {
      expect(channels).toContain(channelEdge.node.id);
    });
  });

  it('should query single channel with channelId', async () => {
    const variables = {
      channelId: channels[0],
    };

    const response = await authClient.request(channelQuery, variables);

    expect(response).toHaveProperty('channel');
  });

  it('should invite users to [public] channel', async () => {
    const usersToInvite = friendsId;

    const variables = {
      channelId: channels[2],
      userIds: usersToInvite,
    };

    const response = await authClient.request(inviteToChannel, variables);

    expect(response).toHaveProperty('inviteUsersToChannel');
    expect(response.inviteUsersToChannel).toHaveProperty('memberships');

    const inviteResponse = response.inviteUsersToChannel;

    expect(Array.isArray(inviteResponse.memberships)).toBe(true);

    for (let i = 0; i < inviteResponse.memberships.length; i++) {
      expect(inviteResponse.memberships[i]).toHaveProperty('user');
      expect(inviteResponse.memberships[i].user).toHaveProperty('id');
    }

    const userIdsInChannel = inviteResponse.memberships.map((i) => i.user.id);

    for (const userId of usersToInvite)
      expect(userIdsInChannel).toContain(userId);
  });

  it('should throw when trying to invite users to [private] channel', async () => {
    const usersToInvite = friendsId.slice(0, 1);

    const variables = {
      channelId: channels[0],
      userIds: usersToInvite,
    };

    const response = authClient.request(createChannel, variables);

    expect(response).rejects.toThrow();
  });

  it('should kick users from [public] channel', async () => {
    const usersToKick = friendsId;

    const variables = {
      channelId: channels[2],
      userIds: usersToKick,
    };

    const response = await authClient.request(kickFromChannel, variables);

    expect(response).toHaveProperty('kickUsersFromChannel');

    const kickResponse = response.kickUsersFromChannel;

    expect(kickResponse).toHaveProperty('memberships');
    expect(Array.isArray(kickResponse.memberships)).toBe(true);

    for (let i = 0; i < kickResponse.memberships.length; i++) {
      expect(kickResponse.memberships[i]).toHaveProperty('user');
      expect(kickResponse.memberships[i].user).toHaveProperty('id');
    }

    const userIdsInChannel = kickResponse.memberships.map((i) => i.user.id);

    for (const i of usersToKick) expect(userIdsInChannel).not.toContain(i);
  });

  it('should throw when trying to kick users from [private] channel', async () => {
    const usersToKick = friendsId.slice(0, 1);

    const variables = {
      channelId: channels[0],
      userIds: usersToKick,
    };

    const response = authClient.request(kickFromChannel, variables);

    expect(response).rejects.toThrow();
  });

  it('should let user leave [public] channel and remove membership', async () => {
    const variables = {
      channelId: channels[2],
    };

    const response = await authClient.request(leaveChannel, variables);

    expect(response).toHaveProperty('leaveChannel');

    const responseMyChannel = await authClient.request(channelsQuery);

    expect(responseMyChannel).toHaveProperty('channels');
    // The deletion should happen in `channels` query
    expect(responseMyChannel.channels.edges).toHaveLength(channels.length - 1);
  });

  it('should update visibility on [private] channel and remain membership', async () => {
    const variables = {
      channelId: channels[0],
    };

    const response = await authClient.request(leaveChannel, variables);

    expect(response).toHaveProperty('leaveChannel');

    const responseMyChannel = await authClient.request(channelsQuery);

    expect(responseMyChannel).toHaveProperty('channels');
    // The deletion should happen in `channels` query
    expect(responseMyChannel.channels.edges).toHaveLength(channels.length - 2);
  });

  let newChannelId: string;

  it('should create private channel if does not exists', async () => {
    const variables = {
      peerUserIds: [friendsId[0]],
    };

    const response = await authClient.request(
      findOrCreatePrivateChannel,
      variables,
    );

    expect(response).toHaveProperty('findOrCreatePrivateChannel');
    expect(response.findOrCreatePrivateChannel).toHaveProperty('id');

    newChannelId = response.findOrCreatePrivateChannel.id;
  });

  it('should return private channel it exists', async () => {
    const variables = {
      peerUserIds: [friendsId[0]],
    };

    const response = await authClient.request(
      findOrCreatePrivateChannel,
      variables,
    );

    expect(response).toHaveProperty('findOrCreatePrivateChannel');
    expect(response.findOrCreatePrivateChannel).toHaveProperty('id');
    expect(response.findOrCreatePrivateChannel.id).toEqual(newChannelId);
  });
});
