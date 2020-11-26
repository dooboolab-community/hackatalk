/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ProfileModalDeleteBlockedUserMutationVariables = {
    blockedUserId: string;
};
export type ProfileModalDeleteBlockedUserMutationResponse = {
    readonly deleteBlockedUser: {
        readonly blockedUser: {
            readonly id: string;
            readonly email: string | null;
            readonly name: string | null;
            readonly nickname: string | null;
            readonly hasBlocked: boolean | null;
        } | null;
    } | null;
};
export type ProfileModalDeleteBlockedUserMutation = {
    readonly response: ProfileModalDeleteBlockedUserMutationResponse;
    readonly variables: ProfileModalDeleteBlockedUserMutationVariables;
};



/*
mutation ProfileModalDeleteBlockedUserMutation(
  $blockedUserId: String!
) {
  deleteBlockedUser(blockedUserId: $blockedUserId) {
    blockedUser {
      id
      email
      name
      nickname
      hasBlocked
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "blockedUserId"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "blockedUserId",
                    "variableName": "blockedUserId"
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
                            "name": "nickname",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "hasBlocked",
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
            "cacheID": "d7526ce8b862fbf9a42654617ef4dddf",
            "id": null,
            "metadata": {},
            "name": "ProfileModalDeleteBlockedUserMutation",
            "operationKind": "mutation",
            "text": "mutation ProfileModalDeleteBlockedUserMutation(\n  $blockedUserId: String!\n) {\n  deleteBlockedUser(blockedUserId: $blockedUserId) {\n    blockedUser {\n      id\n      email\n      name\n      nickname\n      hasBlocked\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '7bb8e8ff9a32d1ff5cf84d4a5a002a9f';
export default node;
