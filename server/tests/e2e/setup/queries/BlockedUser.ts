export const addBlockedUserMutation = /* GraphQL */`
  mutation addBlockedUser($blockedUserId: String!) {
    addBlcokedUser(blockedUserId: $blockedUserId) {
      user {
        email
      }
      blockedUser {
        email
      }
    }
  }
`;

export const deleteBlockedUserMutation = /* GraphQL */`
  mutation deleteBlockedUser($blockedUserId: String!) {
    deleteBlockedUser(blockedUserId: $blockedUserId) {
      user {
        email
      }
      blockedUser {
        email
      }
    }
  }
`;
