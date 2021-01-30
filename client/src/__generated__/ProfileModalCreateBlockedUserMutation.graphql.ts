/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ProfileModalCreateBlockedUserMutationVariables = {
    blockedUserId: string;
};
export type ProfileModalCreateBlockedUserMutationResponse = {
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
export type ProfileModalCreateBlockedUserMutation = {
    readonly response: ProfileModalCreateBlockedUserMutationResponse;
    readonly variables: ProfileModalCreateBlockedUserMutationVariables;
};



/*
mutation ProfileModalCreateBlockedUserMutation(
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
    "name": "ProfileModalCreateBlockedUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileModalCreateBlockedUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "731c4c863ece1b5c125915670be2bae7",
    "id": null,
    "metadata": {},
    "name": "ProfileModalCreateBlockedUserMutation",
    "operationKind": "mutation",
    "text": "mutation ProfileModalCreateBlockedUserMutation(\n  $blockedUserId: String!\n) {\n  createBlockedUser(blockedUserId: $blockedUserId) {\n    blockedUser {\n      id\n      email\n      name\n      nickname\n      hasBlocked\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6aa9bf21b798c9e07b93811d5b1da6d8';
export default node;
