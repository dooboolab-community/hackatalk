export const sendReply = /* GraphQL */`
  mutation sendReply($messageId: String, $message: MessageCreateInput) {
    sendReply(messageId: $messageId, message: $message) {
        id
        text
        messageType
        sender {
            id
        }
    }
  }
`;
