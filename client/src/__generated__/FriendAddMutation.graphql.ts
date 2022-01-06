/**
 * @generated SignedSource<<0c30cdfd53963945e747382822965a89>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FriendAddMutation$variables = {
  friendId: string;
};
export type FriendAddMutationVariables = FriendAddMutation$variables;
export type FriendAddMutation$data = {
  readonly addFriend: {
    readonly friend: {
      readonly id: string;
      readonly isFriend: boolean | null;
    } | null;
  } | null;
};
export type FriendAddMutationResponse = FriendAddMutation$data;
export type FriendAddMutation = {
  variables: FriendAddMutationVariables;
  response: FriendAddMutation$data;
};

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

(node as any).hash = "e4eb66b7631419b65f07fa38c7eeb214";

export default node;
