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
    "cacheID": "e6824128ef490212bcc9b08bfa6ecca4",
    "id": null,
    "metadata": {},
    "name": "FriendDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation FriendDeleteMutation(\n  $friendId: String!\n) {\n  deleteFriend(friendId: $friendId) {\n    friend {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '176edfc666a319a4889313b91cc4bf44';
export default node;
