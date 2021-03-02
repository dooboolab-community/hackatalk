/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MessageSubscriptionVariables = {
    channelId: string;
};
export type MessageSubscriptionResponse = {
    readonly onMessage: {
        readonly channel: {
            readonly id: string;
            readonly name: string | null;
        } | null;
        readonly messageType: unknown;
        readonly text: string | null;
    } | null;
};
export type MessageSubscription = {
    readonly response: MessageSubscriptionResponse;
    readonly variables: MessageSubscriptionVariables;
};



/*
subscription MessageSubscription(
  $channelId: String!
) {
  onMessage(channelId: $channelId) {
    channel {
      id
      name
    }
    messageType
    text
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "channelId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "channelId",
        "variableName": "channelId"
      }
    ],
    "concreteType": "Message",
    "kind": "LinkedField",
    "name": "onMessage",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Channel",
        "kind": "LinkedField",
        "name": "channel",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "messageType",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "text",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MessageSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MessageSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a709ebd5eecc4d5b372a73b09d975875",
    "id": null,
    "metadata": {},
    "name": "MessageSubscription",
    "operationKind": "subscription",
    "text": "subscription MessageSubscription(\n  $channelId: String!\n) {\n  onMessage(channelId: $channelId) {\n    channel {\n      id\n      name\n    }\n    messageType\n    text\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c90548bf8e508b8fa350715c0086781a';
export default node;
