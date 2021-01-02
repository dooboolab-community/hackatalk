export const createBlockedUserMutation = /* GraphQL */ `
  mutation createBlockedUser($blockedUserId: String!) {
    createBlockedUser(blockedUserId: $blockedUserId) {
      user {
        email
      }
      blockedUser {
        email
      }
    }
  }
`;

export const deleteBlockedUserMutation = /* GraphQL */ `
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
