import {Observable, RequestParameters, Variables} from 'relay-runtime';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {SUBSCRIPTION_URL} from '../../config';
import {SubscriptionClient} from 'subscriptions-transport-ws';

async function createClient(): Promise<SubscriptionClient> {
  const token = await AsyncStorage.getItem('token');

  return new SubscriptionClient(SUBSCRIPTION_URL, {
    reconnect: true,
    connectionParams: {
      Authorization: token ?? '',
    },
  });
}

export const subscribe = (
  operation: RequestParameters,
  variables: Variables,
): Observable<any> => {
  return Observable.create((sink) => {
    createClient()
      .then((client) => {
        if (!operation.text) {
          throw new Error('Query cannot be empty.');
        }

        client
          .request({
            query: operation.text,
            operationName: operation.name,
            variables,
          })
          .subscribe({
            complete: () => sink.complete(),
            error: (err) => sink.error(err),
            next: (val) => sink.next(val),
          });
      })
      .catch((err) => sink.error(err));
  });
};
