export const createChannel = /* GraphQL */`
  mutation createChannel(
    $channel: ChannelCreateInput
    $message: MessageCreateInput
  ) {
    createChannel(
      channel: $channel
      message: $message
    ) {
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

export const channelQuery = /* GraphQL */`
  query channel($channelId: String) {
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

export const myChannelsQuery = /* GraphQL */`
  query myChannels {
    myChannels {
      channelType
      name
      id
    }
  }
`;
