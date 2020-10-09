/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AppCreateNotificationMutationVariables = {
    token: string;
    device?: string | null;
    os?: string | null;
};
export type AppCreateNotificationMutationResponse = {
    readonly createNotification: {
        readonly id: number;
        readonly token: string;
        readonly device: string | null;
        readonly os: string | null;
    };
};
export type AppCreateNotificationMutation = {
    readonly response: AppCreateNotificationMutationResponse;
    readonly variables: AppCreateNotificationMutationVariables;
};



/*
mutation AppCreateNotificationMutation(
  $token: String!
  $device: String
  $os: String
) {
  createNotification(token: $token, device: $device, os: $os) {
    id
    token
    device
    os
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "device"
    } as any), v1 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "os"
    } as any), v2 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "token"
    } as any), v3 = [
        ({
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
                    "name": "os",
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": [
                (v0 /*: any*/),
                (v1 /*: any*/),
                (v2 /*: any*/)
            ],
            "kind": "Fragment",
            "metadata": null,
            "name": "AppCreateNotificationMutation",
            "selections": (v3 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [
                (v2 /*: any*/),
                (v0 /*: any*/),
                (v1 /*: any*/)
            ],
            "kind": "Operation",
            "name": "AppCreateNotificationMutation",
            "selections": (v3 /*: any*/)
        },
        "params": {
            "cacheID": "6e62864c8be3006427f658baaab8afe1",
            "id": null,
            "metadata": {},
            "name": "AppCreateNotificationMutation",
            "operationKind": "mutation",
            "text": "mutation AppCreateNotificationMutation(\n  $token: String!\n  $device: String\n  $os: String\n) {\n  createNotification(token: $token, device: $device, os: $os) {\n    id\n    token\n    device\n    os\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'dca4279d2502316f74ed222679f1ae53';
export default node;
