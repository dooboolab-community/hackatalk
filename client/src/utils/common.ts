import { Alert, Platform } from 'react-native';

import { getString } from '../../STRINGS';

export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

export const validatePassword = (password: string): boolean => {
  const re = /^.*(?=.{6,15})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  return re.test(password);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const showAlertForError = (error: any): void => {
  Platform.select({
    // @ts-ignore
    web: alert(error || ''),
    default: Alert.alert(getString('ERROR'), error || ''),
  });
};
