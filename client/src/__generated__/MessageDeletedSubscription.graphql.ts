/**
 * @generated SignedSource<<7000534f1369b639d10355e79746a082>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type MessageDeletedSubscription$variables = {
  channelId: string;
};
export type MessageDeletedSubscriptionVariables = MessageDeletedSubscription$variables;
export type MessageDeletedSubscription$data = {
  readonly deleteMessage: {
    readonly id: string;
    readonly channelId: string;
    readonly deletedAt: any | null;
  } | null;
};
export type MessageDeletedSubscriptionResponse = MessageDeletedSubscription$data;
export type MessageDeletedSubscription = {
  variables: MessageDeletedSubscriptionVariables;
  response: MessageDeletedSubscription$data;
};

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
    "name": "deleteMessage",
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
        "name": "channelId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "deletedAt",
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
    "name": "MessageDeletedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MessageDeletedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f2d6b61b65eef142c9e98f04d0b97c4e",
    "id": null,
    "metadata": {
      "subscriptionName": "deleteMessage"
    },
    "name": "MessageDeletedSubscription",
    "operationKind": "subscription",
    "text": "subscription MessageDeletedSubscription(\n  $channelId: String!\n) {\n  deleteMessage(channelId: $channelId) {\n    id\n    channelId\n    deletedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "74b521aa8c610fa7df1a5dd997695ecb";

export default node;
