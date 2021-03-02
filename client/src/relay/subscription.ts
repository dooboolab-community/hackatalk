import {Observable} from 'relay-runtime';
import {SUBSCRIPTION_URL} from '../../config';
import {SubscriptionClient} from 'subscriptions-transport-ws';

const subscriptionClient = new SubscriptionClient(SUBSCRIPTION_URL, {
  reconnect: true,
});

export const subscribe = (
  request: {text: any; name: any},
  variables: any,
): Observable<any> => {
  const subscribeObservable = subscriptionClient.request({
    query: request.text,
    operationName: request.name,
    variables,
  });

  // Important: Convert subscriptions-transport-ws observable type to Relay's
  // @ts-ignore
  return Observable.from(subscribeObservable);
};
