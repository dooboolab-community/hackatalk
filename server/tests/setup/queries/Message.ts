export const createMessage = /* GraphQL */`
  mutation createMessage(
    $channelId: String!
    $message: MessageCreateInput!
  ) {
    createMessage(
      channelId: $channelId
      message: $message
    ) {
      id
      text
    }
  }
`;
