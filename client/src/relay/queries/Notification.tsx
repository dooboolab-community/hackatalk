import {graphql} from 'react-relay';

export const createNotification = graphql`
  mutation NotificationCreateNotificationMutation(
    $token: String!
    $device: String
    $os: String
  ) {
    createNotification(token: $token, device: $device, os: $os) {
      id
      token
      device
      createdAt
    }
  }
`;

export const deleteNotification = graphql`
  mutation NotificationDeleteNotificationMutation($token: String!) {
    deleteNotification(token: $token) {
      id
      token
      device
      createdAt
    }
  }
`;
