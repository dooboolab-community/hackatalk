import gql from 'graphql-tag';

export const MUTATION_SIGN_UP = gql`
  mutation signUp($user: UserInput!) {
    signUp(user: $user) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const MUTATION_SIGN_IN = gql`
  mutation signInEmail($email: String! $password: String!) {
    signInEmail(email: $email password: $password) {
      token
    }
  }
`;
