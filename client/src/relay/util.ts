import {LogRequestInfoFunction} from 'relay-runtime';

export const __DEV__ = process.env.NODE_ENV === 'development';

export const relayTransactionLogger =
  () =>
  (event: LogRequestInfoFunction): void => {
    console.log('RELAY_CONSOLE', event);
  };

export const normalizeErrorString = (error: any): string => {
  let str: string = error.toString();
  str = str.split(':')?.[2] || '';
  str = str.split('\n')?.[1] || '';

  return str;
};
