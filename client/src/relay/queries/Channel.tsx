import {graphql} from 'react-relay';

export const channelQuery = graphql`
  query ChannelQuery($channelId: String!) {
    channel(channelId: $channelId) {
      id
      name
      memberships {
        user {
          id
          nickname
          name
        }
      }
    }
  }
`;

export const channelsQuery = graphql`
  query ChannelsQuery($first: Int!, $after: String, $withMessage: Boolean) {
    ...MainChannelComponent_channel
      @arguments(first: $first, after: $after, withMessage: $withMessage)
  }
`;

export const findOrCreatePrivateChannel = graphql`
  mutation ChannelFindOrCreatePrivateChannelMutation($peerUserIds: [String!]!) {
    findOrCreatePrivateChannel(peerUserIds: $peerUserIds) {
      id
      name
      channelType
    }
  }
`;

export const inviteUsersToChannel = graphql`
  mutation ChannelInviteUsersToChannelMutation(
    $channelId: String!
    $userIds: [String!]!
  ) {
    inviteUsersToChannel(channelId: $channelId, userIds: $userIds) {
      id
      channelType
      name
      lastMessageId
    }
  }
`;

export const leaveChannel = graphql`
  mutation ChannelLeaveChannelMutation($channelId: String!) {
    leaveChannel(channelId: $channelId) {
      user {
        id
      }
      channel {
        id
      }
      alertMode
    }
  }
`;
