/**
 * @generated SignedSource<<f8ce794e326e2e4da430bf53f21b505c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type NotificationDeleteNotificationMutation$variables = {
  token: string;
};
export type NotificationDeleteNotificationMutation$data = {
  readonly deleteNotification: {
    readonly id: number;
    readonly token: string;
    readonly device: string | null;
    readonly createdAt: any | null;
  } | null;
};
export type NotificationDeleteNotificationMutation = {
  variables: NotificationDeleteNotificationMutation$variables;
  response: NotificationDeleteNotificationMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
    "concreteType": "Notification",
    "kind": "LinkedField",
    "name": "deleteNotification",
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
        "name": "token",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "device",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
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
    "name": "NotificationDeleteNotificationMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NotificationDeleteNotificationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f1d9280bcdd359a6e3e95f1c203d4b0f",
    "id": null,
    "metadata": {},
    "name": "NotificationDeleteNotificationMutation",
    "operationKind": "mutation",
    "text": "mutation NotificationDeleteNotificationMutation(\n  $token: String!\n) {\n  deleteNotification(token: $token) {\n    id\n    token\n    device\n    createdAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "33ff5a6bcb4157acc9baec2582521a38";

export default node;
