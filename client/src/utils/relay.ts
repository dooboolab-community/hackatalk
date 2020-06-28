import { LogRequestInfoFunction } from 'relay-runtime';

export const __DEV__ = process.env.NODE_ENV === 'development';

export const relayTransactionLogger = () => (
  event: LogRequestInfoFunction,
): void => {
  console.log('RELAY_CONSOLE: ', event);
};
