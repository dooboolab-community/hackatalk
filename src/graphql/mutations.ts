import gql from 'graphql-tag';

export interface MutationSignUpInput {
  user: {
    email: string;
    password: string;
    name: string;
    statusMessage: string;
  };
}

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

export interface MutationSendVerificationInput {
  email: string;
}

export const MUTATION_SEND_VERIFICATION = gql`
  mutation sendVerification($email: String!) {
    sendVerification(email: $email)
  }
`;

export interface SignInEmailInput {
  email: string; password: string;
}

export const MUTATION_SIGN_IN = gql`
  mutation signInEmail($email: String!, $password: String!) {
    signInEmail(email: $email, password: $password) {
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
    changeEmailPassword(password: $currentPassword newPassword: $newPassword) {
      changeEmailPassword
    }
  }
`;

export interface MutationFindPasswordInput {
  email: string;
}

export const MUTATION_FIND_PASSWORD = gql`
  mutation findPassword($email: String!) {
    findPassword(email: $email) {
      findPassword
    }
  }
`;

export const MUTATION_ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!){
    addFriend(friendId: $friendId) {
      id
      email
      name
    }
  }
`;
