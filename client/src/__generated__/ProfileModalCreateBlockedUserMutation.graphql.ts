/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ProfileModalCreateBlockedUserMutationVariables = {
    userId: string;
};
export type ProfileModalCreateBlockedUserMutationResponse = {
    readonly createBlockedUser: {
        readonly blockedUser: {
            readonly id: string;
        } | null;
    };
};
export type ProfileModalCreateBlockedUserMutation = {
    readonly response: ProfileModalCreateBlockedUserMutationResponse;
    readonly variables: ProfileModalCreateBlockedUserMutationVariables;
};



/*
mutation ProfileModalCreateBlockedUserMutation(
  $userId: String!
) {
  createBlockedUser(blockedUserId: $userId) {
    blockedUser {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "userId"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "blockedUserId",
                    "variableName": "userId"
                }
            ],
            "concreteType": "BlockedUser",
            "kind": "LinkedField",
            "name": "createBlockedUser",
            "plural": false,
            "selections": [
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "blockedUser",
                    "plural": false,
                    "selections": [
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "id",
                            "storageKey": null
                        }
                    ],
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
            "name": "ProfileModalCreateBlockedUserMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "ProfileModalCreateBlockedUserMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "a826d7f337a5654d46085271b869449c",
            "id": null,
            "metadata": {},
            "name": "ProfileModalCreateBlockedUserMutation",
            "operationKind": "mutation",
            "text": "mutation ProfileModalCreateBlockedUserMutation(\n  $userId: String!\n) {\n  createBlockedUser(blockedUserId: $userId) {\n    blockedUser {\n      id\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '1eeb3d46793db60ff8c99391b3ae5ac6';
export default node;
