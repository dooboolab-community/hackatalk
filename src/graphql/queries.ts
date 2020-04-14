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

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

interface UserQueryInput {
  email?: string;
  name: string;
  nickname?: string;
  birthday?: Date;
  gender?: Gender;
  phone?: string;
}

export interface QueryUsersInput {
  filter?: boolean;
  user?: UserQueryInput;
  first: number;
  last?: number;
  before?: string;
  after?: string;
}

export const QUERY_USERS = gql`
  query users(
    $filter: Boolean
    $user: UserQueryInput
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    users(
      filter: $filter
      user: $user
      first: $first
      last: $last
      before: $before
      after: $after
    ) {
      totalCount
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
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
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
