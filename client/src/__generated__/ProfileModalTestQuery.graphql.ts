/**
 * @generated SignedSource<<5e017e258cd528bc1ac57ad82ee725f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileModalTestQuery$variables = {};
export type ProfileModalTestQueryVariables = ProfileModalTestQuery$variables;
export type ProfileModalTestQuery$data = {
  readonly myData: {
    readonly " $fragmentSpreads": FragmentRefs<"ProfileModal_user">;
  } | null;
};
export type ProfileModalTestQueryResponse = ProfileModalTestQuery$data;
export type ProfileModalTestQuery = {
  variables: ProfileModalTestQueryVariables;
  response: ProfileModalTestQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test-id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProfileModalTestQuery",
    "selections": [
      {
        "alias": "myData",
        "args": (v0/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProfileModal_user"
          }
        ],
        "storageKey": "user(id:\"test-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ProfileModalTestQuery",
    "selections": [
      {
        "alias": "myData",
        "args": (v0/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
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
            "name": "photoURL",
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
            "name": "isFriend",
            "storageKey": null
          }
        ],
        "storageKey": "user(id:\"test-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "5815d0b2fa821d35e57fbca69d4926d0",
    "id": null,
    "metadata": {},
    "name": "ProfileModalTestQuery",
    "operationKind": "query",
    "text": "query ProfileModalTestQuery {\n  myData: user(id: \"test-id\") {\n    ...ProfileModal_user\n    id\n  }\n}\n\nfragment ProfileModal_user on User {\n  id\n  photoURL\n  name\n  nickname\n  hasBlocked\n  statusMessage\n  isFriend\n}\n"
  }
};
})();

(node as any).hash = "7b45aba25079e2138a1378b69a511d12";

export default node;
