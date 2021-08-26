/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type NotificationCreateNotificationMutationVariables = {
    token: string;
    device?: string | null;
    os?: string | null;
};
export type NotificationCreateNotificationMutationResponse = {
    readonly createNotification: {
        readonly id: number;
        readonly token: string;
        readonly device: string | null;
        readonly createdAt: unknown | null;
    } | null;
};
export type NotificationCreateNotificationMutation = {
    readonly response: NotificationCreateNotificationMutationResponse;
    readonly variables: NotificationCreateNotificationMutationVariables;
};



/*
mutation NotificationCreateNotificationMutation(
  $token: String!
  $device: String
  $os: String
) {
  createNotification(token: $token, device: $device, os: $os) {
    id
    token
    device
    createdAt
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "device"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "os"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "token"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "device",
        "variableName": "device"
      },
      {
        "kind": "Variable",
        "name": "os",
        "variableName": "os"
      },
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
    "concreteType": "Notification",
    "kind": "LinkedField",
    "name": "createNotification",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NotificationCreateNotificationMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "NotificationCreateNotificationMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "fc82b348807a617a56d66f4af86da492",
    "id": null,
    "metadata": {},
    "name": "NotificationCreateNotificationMutation",
    "operationKind": "mutation",
    "text": "mutation NotificationCreateNotificationMutation(\n  $token: String!\n  $device: String\n  $os: String\n) {\n  createNotification(token: $token, device: $device, os: $os) {\n    id\n    token\n    device\n    createdAt\n  }\n}\n"
  }
};
})();
(node as any).hash = '5ba581f22b993f4439a2046d38677d13';
export default node;
