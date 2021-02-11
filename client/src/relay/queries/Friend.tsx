import {graphql} from 'react-relay';

export const friendsQuery = graphql`
  query FriendsQuery($first: Int!, $after: String, $searchText: String) {
    ...MainFriend_friends @arguments(first: $first, after: $after)
    ...ChannelCreate_friends
      @arguments(first: $first, after: $after, searchText: $searchText)
  }
`;
