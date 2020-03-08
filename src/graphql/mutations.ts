import gql from 'graphql-tag';

export const MUTATION_SIGN_UP = gql`
  mutation signUp($user: UserInput!) {
    signUp(user: $user) {
      token
      user {
        id
        email
        verified
      }
    }
  }
`;

export const MUTATION_SEND_VERIFICATION = gql`
  mutation sendVerification($email: String!) {
    sendVerification(email: $email)
  }
`;

export const MUTATION_SIGN_IN = gql`
  mutation signInEmail($email: String! $password: String!) {
    signInEmail(email: $email password: $password) {
      token
      user {
        id
        email
        nickname
        verified
        statusMessage
        authType
      }
    }
  }
`;

export interface MutationChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export const MUTATION_CHANGE_PASSWORD = gql`
  mutation changeEmailPassword($currentPassword: String! $newPassword: String!) {
    changeEmailPassword(password: $currentPassword newPassword: $newPassword) 
  }
`;

export const MUTATION_FIND_PASSWORD = gql`
  mutation findPassword($email: String!) {
    findPassword(email: $email)
  }
`;
