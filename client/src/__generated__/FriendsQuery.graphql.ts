/**
 * @generated SignedSource<<9e6ba10538d3bf6711e5686b9ed5cdb2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FriendsQuery$variables = {
  first: number;
  after?: string | null;
  searchText?: string | null;
  includeMe?: boolean | null;
};
export type FriendsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MainFriend_friends" | "ChannelCreate_friends">;
};
export type FriendsQuery = {
  variables: FriendsQuery$variables;
  response: FriendsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "includeMe"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "searchText"
},
v4 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "includeMe",
    "variableName": "includeMe"
  },
  {
    "kind": "Variable",
    "name": "searchText",
    "variableName": "searchText"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FriendsQuery",
    "selections": [
      {
        "args": (v4/*: any*/),
        "kind": "FragmentSpread",
        "name": "MainFriend_friends"
      },
      {
        "args": (v4/*: any*/),
        "kind": "FragmentSpread",
        "name": "ChannelCreate_friends"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "FriendsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "UserConnection",
        "kind": "LinkedField",
        "name": "friends",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UserEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "node",
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
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "thumbURL",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "filters": [],
        "handle": "connection",
        "key": "MainFriend_friends",
        "kind": "LinkedHandle",
        "name": "friends"
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "filters": [
          "searchText",
          "includeMe"
        ],
        "handle": "connection",
        "key": "ChannelCreate_friends",
        "kind": "LinkedHandle",
        "name": "friends"
      }
    ]
  },
  "params": {
    "cacheID": "203c6d15d466e67649e454eec08bda32",
    "id": null,
    "metadata": {},
    "name": "FriendsQuery",
    "operationKind": "query",
    "text": "query FriendsQuery(\n  $first: Int!\n  $after: String\n  $searchText: String\n  $includeMe: Boolean\n) {\n  ...MainFriend_friends_1KCjMM\n  ...ChannelCreate_friends_1KCjMM\n}\n\nfragment ChannelCreate_friends_1KCjMM on Query {\n  friends(first: $first, after: $after, searchText: $searchText, includeMe: $includeMe) {\n    edges {\n      cursor\n      node {\n        id\n        nickname\n        name\n        thumbURL\n        photoURL\n        ...UserListItem_user\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment MainFriend_friends_1KCjMM on Query {\n  friends(first: $first, after: $after, searchText: $searchText, includeMe: $includeMe) {\n    edges {\n      cursor\n      node {\n        id\n        ...ProfileModal_user\n        ...UserListItem_user\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment ProfileModal_user on User {\n  id\n  photoURL\n  name\n  nickname\n  hasBlocked\n  statusMessage\n  isFriend\n}\n\nfragment UserListItem_user on User {\n  id\n  photoURL\n  nickname\n  name\n  statusMessage\n  isOnline\n  hasBlocked\n}\n"
  }
};
})();

(node as any).hash = "83e83cdfcf6f4a0573ac1e9b2624e488";

export default node;
