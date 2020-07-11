import gql from 'graphql-tag';

export const signUpMutation = /* GraphQL */`
  mutation signUp($user: UserCreateInput) {
    signUp(user: $user) {
      id
      name
      email
      gender
    }
  }
`;

export const signInEmailMutation = /* GraphQL */`
  mutation signInEmail($email: String! $password: String!) {
    signInEmail(email: $email password: $password) {
      token
      user {
        id
        name
        email
        gender
        createdAt
      }
    }
  }
`;

export const signInWithGoogle = /* GraphQL */`
  mutation signInWithGoogle($accessToken: String!) {
    signInWithGoogle(accessToken: $accessToken) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const signInWithFacebook = /* GraphQL */`
  mutation signInWithFacebook($accessToken: String!) {
    signInWithFacebook(accessToken: $accessToken) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const updateProfileMutation = /* GraphQL */`
  mutation updateProfile($user: UserUpdateInput) {
    updateProfile(user: $user) {
      name
      gender
    }
  }
`;

export const meQuery = /* GraphQL */`
  query me {
    me {
      id
      email
      name
    }
  }
`;

export const userUpdatedSubscription = gql`
subscription userUpdated($userId: String!) {
  userUpdated(userId: $userId) {
    id
    email
    name
    gender
  }
}
`;

export const userSignedInSubscription = gql`
subscription userSignedIn($userId: String!) {
  userSignedIn(userId: $userId) {
    id
    email
    name
    gender
    createdAt
  }
}
`;
