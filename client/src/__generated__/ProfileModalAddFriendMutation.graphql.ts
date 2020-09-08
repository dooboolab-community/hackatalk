/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ProfileModalAddFriendMutationVariables = {
    friendId: string;
};
export type ProfileModalAddFriendMutationResponse = {
    readonly addFriend: {
        readonly friend: {
            readonly name: string | null;
        } | null;
        readonly createdAt: unknown | null;
    };
};
export type ProfileModalAddFriendMutation = {
    readonly response: ProfileModalAddFriendMutationResponse;
    readonly variables: ProfileModalAddFriendMutationVariables;
};



/*
mutation ProfileModalAddFriendMutation(
  $friendId: String!
) {
  addFriend(friendId: $friendId) {
    friend {
      name
    }
    createdAt
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "friendId"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "friendId",
                    "variableName": "friendId"
                }
            ],
            "concreteType": "Friend",
            "kind": "LinkedField",
            "name": "addFriend",
            "plural": false,
            "selections": [
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "friend",
                    "plural": false,
                    "selections": [
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                        }
                    ],
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
            "name": "ProfileModalAddFriendMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "ProfileModalAddFriendMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "3c02c3a2ba1c59aef8ec9f177d8b5ea9",
            "id": null,
            "metadata": {},
            "name": "ProfileModalAddFriendMutation",
            "operationKind": "mutation",
            "text": "mutation ProfileModalAddFriendMutation(\n  $friendId: String!\n) {\n  addFriend(friendId: $friendId) {\n    friend {\n      name\n    }\n    createdAt\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'bffbaf9e55397398b48c9f4d6a88b731';
export default node;
