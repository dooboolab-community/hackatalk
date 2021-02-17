import {graphql} from 'react-relay';

export const createBlockedUserMutation = graphql`
  mutation BlockedUserCreateMutation($blockedUserId: String!) {
    createBlockedUser(blockedUserId: $blockedUserId) {
      blockedUser {
        id
        email
        name
        nickname
        hasBlocked
      }
    }
  }
`;

export const deleteBlockedUserMutation = graphql`
  mutation BlockedUserDeleteMutation($blockedUserId: String!) {
    deleteBlockedUser(blockedUserId: $blockedUserId) {
      blockedUser {
        id
        email
        name
        nickname
        hasBlocked
      }
    }
  }
`;
