import gql from 'graphql-tag';

export const QUERY_ME = gql`
  query me {
    me {
      id
      email
      nickname
      name
      statusMessage
      verified
      authType
    }
  }
`;

export interface QueryUsersInput {
  nickname: string;
}

export const QUERY_USERS = gql`
  query users($nickname: String) {
    users(user: { nickname: $nickname }) {
      edges {
        node {
          id
          email
          name
          nickname
          thumbURL
          photoURL
          birthday
          gender
          socialId
          authType
          phone
          verified
          statusMessage
          isOnline
          lastSignedIn
        }
      }
    }
  }
`;

export const QUERY_FRIENDS = gql`
  query friends {
    friends {
      id
      email
      nickname
      birthday
      name
      statusMessage
      verified
      authType
      thumbURL
      photoURL
      isOnline
    }
  }
`;
