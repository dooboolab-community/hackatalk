import {graphql} from 'react-relay';

export const createMessage = graphql`
  mutation MessageCreateMutation(
    $channelId: String!
    $message: MessageCreateInput!
  ) {
    createMessage(channelId: $channelId, message: $message) {
      id
      text
      messageType
      imageUrls
      fileUrls
      channel {
        id
        channelType
        name
        memberships(excludeMe: true) {
          user {
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
    $last: Int!
    $before: String
    $channelId: String!
    $searchText: String
  ) {
    ...MessageComponent_message
      @arguments(
        last: $last
        before: $before
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
