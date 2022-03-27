import {Alert, Platform} from 'react-native';

import {getString} from '../../STRINGS';

export const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

export const validatePassword = (password: string): boolean => {
  const re = /^.*(?=.{6,15})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  return re.test(password);
};

export const showAlertForError = (error: Error | string): void => {
  if (Platform.OS === 'web') {
    // eslint-disable-next-line no-alert
    return alert(error || '');
  }

  return Alert.alert(
    getString('ERROR'),
    typeof error === 'string' ? error : error?.message ?? '',
  );
};
