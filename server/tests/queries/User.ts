import gql from 'graphql-tag';

export const signUpMutation = /* GraphQL */ `
  mutation signUp($user: UserCreateInput!) {
    signUp(user: $user) {
      id
      name
      email
      gender
    }
  }
`;

export const findPasswordMutation = /* GraphQL */ `
  mutation FindPwMutation($email: String!) {
    findPassword(email: $email)
  }
`;

export const signInEmailMutation = /* GraphQL */ `
  mutation signInEmail($email: String!, $password: String!) {
    signInEmail(email: $email, password: $password) {
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

export const signInWithGoogle = /* GraphQL */ `
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

export const signInWithFacebook = /* GraphQL */ `
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

export const signInWithApple = /* GraphQL */ `
  mutation signInWithApple($accessToken: String!) {
    signInWithApple(accessToken: $accessToken) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const updateProfileMutation = /* GraphQL */ `
  mutation updateProfile($user: UserUpdateInput!) {
    updateProfile(user: $user) {
      name
      gender
    }
  }
`;

export const deleteUserMutation = /* GraphQL */ `
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const meQuery = /* GraphQL */ `
  query me {
    me {
      id
      email
      name
    }
  }
`;

export const userUpdatedSubscription = gql`
  subscription userUpdated {
    userUpdated {
      id
      email
      name
      gender
    }
  }
`;

export const userSignedInSubscription = gql`
  subscription userSignedIn {
    userSignedIn {
      id
      email
      name
      gender
      createdAt
    }
  }
`;
