export const addFriendMutation = /* GraphQL */ `
  mutation addFriend($friendId: String!) {
    addFriend(friendId: $friendId) {
      user {
        email
      }
      friend {
        email
      }
    }
  }
`;

export const deleteFriendMutation = /* GraphQL */ `
  mutation deleteFriend($friendId: String!) {
    deleteFriend(friendId: $friendId) {
      user {
        email
      }
      friend {
        email
      }
    }
  }
`;
