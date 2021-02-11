import {graphql} from 'react-relay';

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
