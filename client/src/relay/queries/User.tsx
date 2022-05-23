import {graphql} from 'react-relay';

export const signInEmail = graphql`
  mutation UserSignInEmailMutation($email: String!, $password: String!) {
    signInEmail(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        photoURL
        verified
        profile {
          authType
          organization
          about
          projects
          positions
          speakings
          contributions
        }
      }
    }
  }
`;

export const signInWithApple = graphql`
  mutation UserSignInAppleMutation($accessToken: String!) {
    signInWithApple(accessToken: $accessToken) {
      token
      user {
        id
        email
        name
        photoURL
        verified
        profile {
          authType
        }
      }
    }
  }
`;

export const signInWithFacebook = graphql`
  mutation UserFacebookSignInMutation($accessToken: String!) {
    signInWithFacebook(accessToken: $accessToken) {
      token
      user {
        id
        email
        name
        photoURL
        verified
        profile {
          authType
          organization
          about
          projects
          positions
          speakings
          contributions
        }
      }
    }
  }
`;

export const signInWithGoogle = graphql`
  mutation UserGoogleSignInMutation($accessToken: String!) {
    signInWithGoogle(accessToken: $accessToken) {
      token
      user {
        id
        email
        name
        photoURL
        verified
        profile {
          authType
          organization
          about
          projects
          positions
          speakings
          contributions
        }
      }
    }
  }
`;

export const signUp = graphql`
  mutation UserSignUpMutation($user: UserCreateInput!, $photoUpload: Upload) {
    signUp(user: $user, photoUpload: $photoUpload) {
      id
      email
      name
      photoURL
      verified
    }
  }
`;

export const sendVerification = graphql`
  mutation UserVerifyEmailMutation($email: String!) {
    sendVerification(email: $email)
  }
`;

export const usersQuery = graphql`
  query UserUsersPaginationQuery(
    $first: Int!
    $after: String
    $searchText: String
  ) {
    ...SearchUserComponent_user
      @arguments(first: $first, after: $after, searchText: $searchText)
  }
`;

export const meQuery = graphql`
  query UserMeQuery {
    me {
      id
      email
      name
      nickname
      statusMessage
      verified
      photoURL
      thumbURL
      profile {
        authType
        organization
        about
        projects
        positions
        speakings
        contributions
      }
    }
  }
`;

export const userQuery = graphql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      id
      email
      name
      nickname
      statusMessage
      verified
      photoURL
      thumbURL
      profile {
        authType
        organization
        about
        projects
        positions
        speakings
        contributions
      }
    }
  }
`;

export const profileUpdate = graphql`
  mutation UserUpdateProfileMutation(
    $user: UserUpdateInput!
    $profile: UserProfileInput
  ) {
    updateProfile(user: $user, profile: $profile) {
      id
      name
      nickname
      statusMessage
    }
  }
`;

export const findPasswordMutation = graphql`
  mutation UserFindPwMutation($email: String!) {
    findPassword(email: $email)
  }
`;

export const changeEmailPasswordMutation = graphql`
  mutation UserChangeEmailPasswordMutation(
    $password: String!
    $newPassword: String!
  ) {
    changeEmailPassword(password: $password, newPassword: $newPassword)
  }
`;

export const blockedUsersQuery = graphql`
  query UserBlockedUsersQuery {
    blockedUsers {
      id
      ...ProfileModal_user
      ...UserListItem_user
    }
  }
`;
