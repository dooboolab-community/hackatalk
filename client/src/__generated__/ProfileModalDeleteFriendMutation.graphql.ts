/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ProfileModalDeleteFriendMutationVariables = {
    friendId: string;
};
export type ProfileModalDeleteFriendMutationResponse = {
    readonly deleteFriend: {
        readonly friend: {
            readonly id: string;
        } | null;
    } | null;
};
export type ProfileModalDeleteFriendMutation = {
    readonly response: ProfileModalDeleteFriendMutationResponse;
    readonly variables: ProfileModalDeleteFriendMutationVariables;
};



/*
mutation ProfileModalDeleteFriendMutation(
  $friendId: String!
) {
  deleteFriend(friendId: $friendId) {
    friend {
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
            "name": "deleteFriend",
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
            "name": "ProfileModalDeleteFriendMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "ProfileModalDeleteFriendMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "5db59de77725245c02cd239b07aea341",
            "id": null,
            "metadata": {},
            "name": "ProfileModalDeleteFriendMutation",
            "operationKind": "mutation",
            "text": "mutation ProfileModalDeleteFriendMutation(\n  $friendId: String!\n) {\n  deleteFriend(friendId: $friendId) {\n    friend {\n      id\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'b464424734fa67f8c7b2659e1569a7bd';
export default node;
