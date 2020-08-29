import axios, { AxiosResponse } from 'axios';

import { prisma } from '../context';

export interface ExpoMessage {
  to: string;
  sound?: string;
  title: string;
  body?: string;
  data?: {
    data: string;
  };
}

export const sendPushNotification =
  async (message: ExpoMessage): Promise<AxiosResponse<any>> => {
    return axios.post('https://exp.host/--/api/v2/push/send', {
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

export const getReceiversPushTokens = async (channelId: string, userId: string): Promise<string[]> => {
  const memberships = await prisma.membership.findMany({
    where: {
      channelId,
      userId: { not: userId },
    },
  });

  const users = memberships.map((membership) => membership.userId);

  const notifications = await prisma.notification.findMany({
    where: { userId: { in: users } },
  });

  const tokens = notifications.map((notification) => notification.token);
  return tokens;
};
