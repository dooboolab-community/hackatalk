import {Client, createClient} from 'graphql-ws';
import {Observable, RequestParameters, Variables} from 'relay-runtime';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {SUBSCRIPTION_URL} from '../../config';

async function createWSClient(): Promise<Client> {
  return createClient({
    url: SUBSCRIPTION_URL,
    connectionParams: async () => ({
      Authorization: (await AsyncStorage.getItem('token')) ?? '',
    }),
  });
}

export const fetchOrSubscribe = (
  operation: RequestParameters,
  variables: Variables,
): Observable<any> => {
  return Observable.create((sink) => {
    createWSClient()
      .then((client) => {
        if (!operation.text) {
          throw new Error('Query cannot be empty.');
        }

        client.subscribe(
          {
            query: operation.text,
            operationName: operation.name,
            variables,
          },
          sink,
        );
      })
      .catch((err) => sink.error(err));
  });
};
