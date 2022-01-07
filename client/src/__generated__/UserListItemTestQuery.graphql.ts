/**
 * @generated SignedSource<<a082606cab0de93ce9cf9a1dcb0a55bb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserListItemTestQuery$variables = {};
export type UserListItemTestQueryVariables = UserListItemTestQuery$variables;
export type UserListItemTestQuery$data = {
  readonly myData: {
    readonly " $fragmentSpreads": FragmentRefs<"UserListItem_user">;
  } | null;
};
export type UserListItemTestQueryResponse = UserListItemTestQuery$data;
export type UserListItemTestQuery = {
  variables: UserListItemTestQueryVariables;
  response: UserListItemTestQuery$data;
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
    "name": "UserListItemTestQuery",
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
            "name": "UserListItem_user"
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
    "name": "UserListItemTestQuery",
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
            "name": "nickname",
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
            "name": "statusMessage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isOnline",
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
        "storageKey": "user(id:\"test-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "abfc66970a4cb1f1a8f8591dd3f2adbd",
    "id": null,
    "metadata": {},
    "name": "UserListItemTestQuery",
    "operationKind": "query",
    "text": "query UserListItemTestQuery {\n  myData: user(id: \"test-id\") {\n    ...UserListItem_user\n    id\n  }\n}\n\nfragment UserListItem_user on User {\n  id\n  photoURL\n  nickname\n  name\n  statusMessage\n  isOnline\n  hasBlocked\n}\n"
  }
};
})();

(node as any).hash = "c4a52477153608200e909deac90e3cfc";

export default node;
