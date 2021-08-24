/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type FriendAddMutationVariables = {
    friendId: string;
};
export type FriendAddMutationResponse = {
    readonly addFriend: {
        readonly friend: {
            readonly id: string;
            readonly isFriend: boolean | null;
        } | null;
    } | null;
};
export type FriendAddMutation = {
    readonly response: FriendAddMutationResponse;
    readonly variables: FriendAddMutationVariables;
};



/*
mutation FriendAddMutation(
  $friendId: String!
) {
  addFriend(friendId: $friendId) {
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
    "name": "FriendAddMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FriendAddMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "544c28c83204588b98cec8e076a7f9de",
    "id": null,
    "metadata": {},
    "name": "FriendAddMutation",
    "operationKind": "mutation",
    "text": "mutation FriendAddMutation(\n  $friendId: String!\n) {\n  addFriend(friendId: $friendId) {\n    friend {\n      id\n      isFriend\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e4eb66b7631419b65f07fa38c7eeb214';
export default node;
