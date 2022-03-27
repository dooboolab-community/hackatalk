/**
 * @generated SignedSource<<b08c5aac0a6ea5f6a6f49563a443eb0a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserMeQuery$variables = {};
export type UserMeQuery$data = {
  readonly me: {
    readonly id: string;
    readonly email: string | null;
    readonly name: string | null;
    readonly nickname: string | null;
    readonly statusMessage: string | null;
    readonly verified: boolean | null;
    readonly photoURL: string | null;
    readonly thumbURL: string | null;
    readonly profile: {
      readonly authType: any | null;
    } | null;
  } | null;
};
export type UserMeQuery = {
  variables: UserMeQuery$variables;
  response: UserMeQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "me",
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
        "name": "statusMessage",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "verified",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "photoURL",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "thumbURL",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Profile",
        "kind": "LinkedField",
        "name": "profile",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "authType",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserMeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserMeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "7d65ad470f810669844d4cde6568ccde",
    "id": null,
    "metadata": {},
    "name": "UserMeQuery",
    "operationKind": "query",
    "text": "query UserMeQuery {\n  me {\n    id\n    email\n    name\n    nickname\n    statusMessage\n    verified\n    photoURL\n    thumbURL\n    profile {\n      authType\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d170a02507c90481ece3263e8285b966";

export default node;
