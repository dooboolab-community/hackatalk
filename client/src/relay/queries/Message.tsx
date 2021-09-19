import {graphql} from 'react-relay';

export const createMessage = graphql`
  mutation MessageCreateMutation(
    $channelId: String!
    $message: MessageCreateInput!
    $deviceKey: String!
  ) {
    createMessage(
      channelId: $channelId
      message: $message
      deviceKey: $deviceKey
    ) {
      id
      text
      messageType
      imageUrls
      fileUrls
      createdAt
      sender {
        id
      }
      channel {
        id
        channelType
        name
        memberships(excludeMe: false) {
          user {
            id
            name
            nickname
            thumbURL
            photoURL
          }
        }
        lastMessage {
          messageType
          text
          imageUrls
          fileUrls
          createdAt
        }
      }
    }
  }
`;

export const messagesQuery = graphql`
  query MessagesQuery(
    $first: Int!
    $after: String
    $channelId: String!
    $searchText: String
  ) {
    ...MessageComponent_message
      @arguments(
        first: $first
        after: $after
        channelId: $channelId
        searchText: $searchText
      )
  }
`;

export const lastMessageQuery = graphql`
  query MessageLastMessageQuery($messageId: String!) {
    message(id: $messageId) {
      id
      messageType
      text
      imageUrls
      fileUrls
      createdAt
      sender {
        id
      }
      channel {
        id
        lastMessage {
          id
        }
      }
    }
  }
`;
