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
            readonly id: string;
        } | null;
    } | null;
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
      id
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
            "name": "id",
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
    "name": "ProfileModalAddFriendMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileModalAddFriendMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "72812fb30e64fbee695a4700fd8f6c62",
    "id": null,
    "metadata": {},
    "name": "ProfileModalAddFriendMutation",
    "operationKind": "mutation",
    "text": "mutation ProfileModalAddFriendMutation(\n  $friendId: String!\n) {\n  addFriend(friendId: $friendId) {\n    friend {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5362917e06a0404b41b1f3a300209803';
export default node;
