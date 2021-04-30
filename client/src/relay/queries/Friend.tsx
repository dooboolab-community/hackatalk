import {graphql} from 'react-relay';

export const friendsQuery = graphql`
  query FriendsQuery($first: Int!, $after: String, $searchText: String) {
    ...MainFriend_friends @arguments(first: $first, after: $after)
    ...ChannelCreate_friends
      @arguments(first: $first, after: $after, searchText: $searchText)
  }
`;

export const addFriendMutation = graphql`
  mutation FriendAddMutation($friendId: String!) {
    addFriend(friendId: $friendId) {
      friend {
        id
        isFriend
      }
    }
  }
`;

export const deleteFriendMutation = graphql`
  mutation FriendDeleteMutation($friendId: String!) {
    deleteFriend(friendId: $friendId) {
      friend {
        id
        isFriend
      }
    }
  }
`;
