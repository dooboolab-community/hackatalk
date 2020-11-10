/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ProfileModalDeleteBlockedUserMutationVariables = {
    userId: string;
};
export type ProfileModalDeleteBlockedUserMutationResponse = {
    readonly deleteBlockedUser: {
        readonly blockedUser: {
            readonly id: string;
        } | null;
    };
};
export type ProfileModalDeleteBlockedUserMutation = {
    readonly response: ProfileModalDeleteBlockedUserMutationResponse;
    readonly variables: ProfileModalDeleteBlockedUserMutationVariables;
};



/*
mutation ProfileModalDeleteBlockedUserMutation(
  $userId: String!
) {
  deleteBlockedUser(blockedUserId: $userId) {
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
            "name": "deleteBlockedUser",
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
            "name": "ProfileModalDeleteBlockedUserMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "ProfileModalDeleteBlockedUserMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "3667288151b1c8228aeb8a245041084e",
            "id": null,
            "metadata": {},
            "name": "ProfileModalDeleteBlockedUserMutation",
            "operationKind": "mutation",
            "text": "mutation ProfileModalDeleteBlockedUserMutation(\n  $userId: String!\n) {\n  deleteBlockedUser(blockedUserId: $userId) {\n    blockedUser {\n      id\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '6bd760c1684e78620c4524d717c761a4';
export default node;
