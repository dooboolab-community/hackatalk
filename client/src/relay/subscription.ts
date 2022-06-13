import {Observable, RequestParameters, Variables} from 'relay-runtime';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {SUBSCRIPTION_URL} from '../../config';
import {createClient} from 'graphql-ws';

const subscriptionsClient = createClient({
  url: SUBSCRIPTION_URL,
  shouldRetry: () => true,
  connectionParams: async () => {
    const token = await AsyncStorage.getItem('token');

    return {
      Authorization: token,
    };
  },
});

export const fetchOrSubscribe = (
  operation: RequestParameters,
  variables: Variables,
): Observable<any> => {
  return Observable.create((sink) => {
    if (!operation.text) {
      return sink.error(new Error('Operation text cannot be empty'));
    }

    return subscriptionsClient.subscribe(
      {
        query: operation.text,
        operationName: operation.name,
        variables,
      },
      sink,
    );
  });
};
