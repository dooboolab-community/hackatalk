/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserCreateInput = {
    email: string;
    password: string;
    name?: string | null;
    nickname?: string | null;
    thumbURL?: string | null;
    photoURL?: string | null;
    birthday?: unknown | null;
    gender?: unknown | null;
    phone?: string | null;
    statusMessage?: string | null;
};
export type SignUpMutationVariables = {
    user?: UserCreateInput | null;
};
export type SignUpMutationResponse = {
    readonly signUp: {
        readonly id: string;
        readonly email: string | null;
        readonly name: string | null;
        readonly photoURL: string | null;
        readonly verified: boolean | null;
    } | null;
};
export type SignUpMutation = {
    readonly response: SignUpMutationResponse;
    readonly variables: SignUpMutationVariables;
};



/*
mutation SignUpMutation(
  $user: UserCreateInput
) {
  signUp(user: $user) {
    id
    email
    name
    photoURL
    verified
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "user"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "user",
                    "variableName": "user"
                }
            ],
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "signUp",
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
                    "name": "email",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "photoURL",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "verified",
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
            "name": "SignUpMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "SignUpMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "8ecfd2c3bc4a904abc656676f19948de",
            "id": null,
            "metadata": {},
            "name": "SignUpMutation",
            "operationKind": "mutation",
            "text": "mutation SignUpMutation(\n  $user: UserCreateInput\n) {\n  signUp(user: $user) {\n    id\n    email\n    name\n    photoURL\n    verified\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '3c64340b41281df720473d177aee01c4';
export default node;
