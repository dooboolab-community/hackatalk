/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SettingsDeleteNotificationMutationVariables = {
    token: string;
};
export type SettingsDeleteNotificationMutationResponse = {
    readonly deleteNotification: {
        readonly id: number;
        readonly token: string;
        readonly device: string | null;
        readonly createdAt: unknown | null;
    } | null;
};
export type SettingsDeleteNotificationMutation = {
    readonly response: SettingsDeleteNotificationMutationResponse;
    readonly variables: SettingsDeleteNotificationMutationVariables;
};



/*
mutation SettingsDeleteNotificationMutation(
  $token: String!
) {
  deleteNotification(token: $token) {
    id
    token
    device
    createdAt
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "token"
        } as any)
    ], v1 = [
        ({
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
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "SettingsDeleteNotificationMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "SettingsDeleteNotificationMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "5a45fefcb36b151a45be3ec0f38b73b8",
            "id": null,
            "metadata": {},
            "name": "SettingsDeleteNotificationMutation",
            "operationKind": "mutation",
            "text": "mutation SettingsDeleteNotificationMutation(\n  $token: String!\n) {\n  deleteNotification(token: $token) {\n    id\n    token\n    device\n    createdAt\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '67ae6ccb7e960ba43b96e9bdefdbbaca';
export default node;
