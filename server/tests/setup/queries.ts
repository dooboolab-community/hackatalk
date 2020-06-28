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

export const signInMutation = /* GraphQL */`
  mutation signIn($email: String! $password: String!) {
    signIn(email: $email password: $password) {
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
