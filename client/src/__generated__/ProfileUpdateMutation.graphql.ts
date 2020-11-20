/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserUpdateInput = {
    email?: string | null;
    name?: string | null;
    nickname?: string | null;
    thumbURL?: string | null;
    photoURL?: string | null;
    birthday?: unknown | null;
    phone?: string | null;
    statusMessage?: string | null;
    gender?: unknown | null;
};
export type ProfileUpdateMutationVariables = {
    user?: UserUpdateInput | null;
};
export type ProfileUpdateMutationResponse = {
    readonly updateProfile: {
        readonly name: string | null;
        readonly nickname: string | null;
        readonly statusMessage: string | null;
    } | null;
};
export type ProfileUpdateMutation = {
    readonly response: ProfileUpdateMutationResponse;
    readonly variables: ProfileUpdateMutationVariables;
};



/*
mutation ProfileUpdateMutation(
  $user: UserUpdateInput
) {
  updateProfile(user: $user) {
    name
    nickname
    statusMessage
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
            "name": "updateProfile",
            "plural": false,
            "selections": [
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
                    "name": "nickname",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "statusMessage",
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
            "name": "ProfileUpdateMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "ProfileUpdateMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "46e704f574acae924836eb4fb4110146",
            "id": null,
            "metadata": {},
            "name": "ProfileUpdateMutation",
            "operationKind": "mutation",
            "text": "mutation ProfileUpdateMutation(\n  $user: UserUpdateInput\n) {\n  updateProfile(user: $user) {\n    name\n    nickname\n    statusMessage\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '615851ad8d10d603952da81d04ccf4a0';
export default node;
