/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SignInCreateNotificationMutationVariables = {
    token: string;
    device?: string | null;
    os?: string | null;
};
export type SignInCreateNotificationMutationResponse = {
    readonly createNotification: {
        readonly id: number;
        readonly token: string;
        readonly device: string | null;
        readonly createdAt: unknown | null;
    } | null;
};
export type SignInCreateNotificationMutation = {
    readonly response: SignInCreateNotificationMutationResponse;
    readonly variables: SignInCreateNotificationMutationVariables;
};



/*
mutation SignInCreateNotificationMutation(
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
                    "name": "createdAt",
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
            "name": "SignInCreateNotificationMutation",
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
            "name": "SignInCreateNotificationMutation",
            "selections": (v3 /*: any*/)
        },
        "params": {
            "cacheID": "e87159af80b83024835534395b9603d4",
            "id": null,
            "metadata": {},
            "name": "SignInCreateNotificationMutation",
            "operationKind": "mutation",
            "text": "mutation SignInCreateNotificationMutation(\n  $token: String!\n  $device: String\n  $os: String\n) {\n  createNotification(token: $token, device: $device, os: $os) {\n    id\n    token\n    device\n    createdAt\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'f2fbb2871161dd79f6d1d80c3a27955b';
export default node;
