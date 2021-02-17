/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BlockedUserCreateMutationVariables = {
    blockedUserId: string;
};
export type BlockedUserCreateMutationResponse = {
    readonly createBlockedUser: {
        readonly blockedUser: {
            readonly id: string;
            readonly email: string | null;
            readonly name: string | null;
            readonly nickname: string | null;
            readonly hasBlocked: boolean | null;
        } | null;
    } | null;
};
export type BlockedUserCreateMutation = {
    readonly response: BlockedUserCreateMutationResponse;
    readonly variables: BlockedUserCreateMutationVariables;
};



/*
mutation BlockedUserCreateMutation(
  $blockedUserId: String!
) {
  createBlockedUser(blockedUserId: $blockedUserId) {
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

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "blockedUserId"
  }
],
v1 = [
  {
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BlockedUserCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BlockedUserCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9032a1898d78e69ef5c5a2a381c1a304",
    "id": null,
    "metadata": {},
    "name": "BlockedUserCreateMutation",
    "operationKind": "mutation",
    "text": "mutation BlockedUserCreateMutation(\n  $blockedUserId: String!\n) {\n  createBlockedUser(blockedUserId: $blockedUserId) {\n    blockedUser {\n      id\n      email\n      name\n      nickname\n      hasBlocked\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '255e2482a3c7ea5d7ce6f42d07cd088b';
export default node;
