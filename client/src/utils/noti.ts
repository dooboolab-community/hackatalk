import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const registerForPushNotificationsAsync = async (): Promise<
  string | undefined
> => {
  let token: string | undefined;

  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
    );

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
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
