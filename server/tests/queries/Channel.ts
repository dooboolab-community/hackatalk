export const createChannel = /* GraphQL */ `
  mutation createChannel(
    $channel: ChannelCreateInput!
    $message: MessageCreateInput
  ) {
    createChannel(channel: $channel, message: $message) {
      id
      name
      lastMessage {
        text
      }
      messages(first: 5) {
        edges {
          node {
            text
          }
        }
      }
    }
  }
`;

export const channelQuery = /* GraphQL */ `
  query channel($channelId: String!) {
    channel(channelId: $channelId) {
      id
      channelType
      name
      lastMessage {
        text
      }
      memberships {
        membershipType
        user {
          email
        }
      }
    }
  }
`;

export const channelsQuery = /* GraphQL */ `
  query channels {
    channels(first: 5) {
      edges {
        node {
          id
          lastMessage {
            messageType
            text
            imageUrls
            fileUrls
          }
        }
      }
    }
  }
`;

export const leaveChannel = /* GraphQL */ `
  mutation leaveChannel($channelId: String!) {
    leaveChannel(channelId: $channelId) {
      user {
        email
      }
      channel {
        id
      }
    }
  }
`;

export const inviteToChannel = /* GraphQL */ `
  mutation inviteToChannel($channelId: String!, $userIds: [String!]!) {
    inviteUsersToChannel(channelId: $channelId, userIds: $userIds) {
      memberships {
        user {
          id
        }
      }
    }
  }
`;

export const kickFromChannel = /* GraphQL */ `
  mutation kickFromChannel($channelId: String!, $userIds: [String!]!) {
    kickUsersFromChannel(channelId: $channelId, userIds: $userIds) {
      memberships {
        user {
          id
        }
      }
    }
  }
`;

export const findOrCreatePrivateChannel = /* GraphQL */ `
  mutation findOrCreatePrivateChannel($peerUserIds: [String!]!) {
    findOrCreatePrivateChannel(peerUserIds: $peerUserIds) {
      id
    }
  }
`;
