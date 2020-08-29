export const sendMessage = /* GraphQL */`
  mutation sendMessage($channelId: String, $message: MessageCreateInput) {
    sendMessage(channelId: $channelId, message: $message) {
        id
        text
        messageType
        channel {
            id
        }
        sender {
            id
        }
    }
  }
`;
