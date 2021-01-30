/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BlockedUsersQueryVariables = {};
export type BlockedUsersQueryResponse = {
    readonly blockedUsers: ReadonlyArray<{
        readonly id: string;
        readonly email: string | null;
        readonly name: string | null;
        readonly nickname: string | null;
        readonly hasBlocked: boolean | null;
        readonly photoURL: string | null;
        readonly thumbURL: string | null;
        readonly statusMessage: string | null;
    } | null> | null;
};
export type BlockedUsersQuery = {
    readonly response: BlockedUsersQueryResponse;
    readonly variables: BlockedUsersQueryVariables;
};



/*
query BlockedUsersQuery {
  blockedUsers {
    id
    email
    name
    nickname
    hasBlocked
    photoURL
    thumbURL
    statusMessage
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "blockedUsers",
    "plural": true,
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
        "kind": "ScalarField",
        "name": "statusMessage",
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
    "name": "BlockedUsersQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BlockedUsersQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b421043e86ab1fd2248fab232a235667",
    "id": null,
    "metadata": {},
    "name": "BlockedUsersQuery",
    "operationKind": "query",
    "text": "query BlockedUsersQuery {\n  blockedUsers {\n    id\n    email\n    name\n    nickname\n    hasBlocked\n    photoURL\n    thumbURL\n    statusMessage\n  }\n}\n"
  }
};
})();
(node as any).hash = '966c263da30910f84072c5f6550ce2f6';
export default node;
