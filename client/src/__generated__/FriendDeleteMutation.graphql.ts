/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type FriendDeleteMutationVariables = {
    friendId: string;
};
export type FriendDeleteMutationResponse = {
    readonly deleteFriend: {
        readonly friend: {
            readonly id: string;
            readonly isFriend: boolean | null;
        } | null;
    } | null;
};
export type FriendDeleteMutation = {
    readonly response: FriendDeleteMutationResponse;
    readonly variables: FriendDeleteMutationVariables;
};



/*
mutation FriendDeleteMutation(
  $friendId: String!
) {
  deleteFriend(friendId: $friendId) {
    friend {
      id
      isFriend
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "friendId"
  }
],
v1 = [
  {
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFriend",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FriendDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FriendDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "83a03bd58e54642b4ea7e6038a998cf6",
    "id": null,
    "metadata": {},
    "name": "FriendDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation FriendDeleteMutation(\n  $friendId: String!\n) {\n  deleteFriend(friendId: $friendId) {\n    friend {\n      id\n      isFriend\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0d50b4385882035ea6d9551c1fc47657';
export default node;
