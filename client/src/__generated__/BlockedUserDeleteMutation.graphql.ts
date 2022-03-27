/**
 * @generated SignedSource<<3f08771b83d06ad4f69a298a780edee0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type BlockedUserDeleteMutation$variables = {
  blockedUserId: string;
};
export type BlockedUserDeleteMutation$data = {
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
export type BlockedUserDeleteMutation = {
  variables: BlockedUserDeleteMutation$variables;
  response: BlockedUserDeleteMutation$data;
};

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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BlockedUserDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BlockedUserDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "577c3448d6c6338443e1af331eba7dbe",
    "id": null,
    "metadata": {},
    "name": "BlockedUserDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation BlockedUserDeleteMutation(\n  $blockedUserId: String!\n) {\n  deleteBlockedUser(blockedUserId: $blockedUserId) {\n    blockedUser {\n      id\n      email\n      name\n      nickname\n      hasBlocked\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "283e8eaf8e72c19582dbfe2e79786479";

export default node;
