import * as Config from '../../config';

import AsyncStorage from '@react-native-async-storage/async-storage';

const {ROOT_URL} = Config;

type Result = {
  token?: string;
  message?: string;
};

export const getIdToken = async (
  body?: Record<string, unknown>,
  signal?: AbortController['signal'],
): Promise<string> => {
  const token = (await AsyncStorage.getItem('token')) || '';

  if (!token) {
    return '';
  }

  const fetchOption = {
    signal,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(body),
  };

  try {
    const res: Response = await fetch(`${ROOT_URL}/get_id_token`, fetchOption);
    const json: Result = await res.json();

    if (json.token && json.token !== token) {
      await AsyncStorage.setItem('token', token);
    }

    return json.token || '';
  } catch (err: any) {
    throw new Error(err);
  }
};
