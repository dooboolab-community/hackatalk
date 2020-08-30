import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { getString } from '../../STRINGS';
import { showAlertForError } from './common';

export const registerForPushNotificationsAsync = async (): Promise<string | undefined> => {
  let token;

  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      showAlertForError(getString('FAILED_GET_PUSH_NOTI'));
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    showAlertForError(getString('MUST_USE_PHYSICAL_DEVICE'));
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
};
