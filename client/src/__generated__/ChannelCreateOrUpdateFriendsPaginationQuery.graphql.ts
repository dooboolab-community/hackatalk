/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ChannelCreateOrUpdateFriendsPaginationQueryVariables = {
    after?: string | null;
    first: number;
    includeMe?: boolean | null;
    searchText?: string | null;
};
export type ChannelCreateOrUpdateFriendsPaginationQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"ChannelCreateOrUpdate_friends">;
};
export type ChannelCreateOrUpdateFriendsPaginationQuery = {
    readonly response: ChannelCreateOrUpdateFriendsPaginationQueryResponse;
    readonly variables: ChannelCreateOrUpdateFriendsPaginationQueryVariables;
};



/*
query ChannelCreateOrUpdateFriendsPaginationQuery(
  $after: String
  $first: Int!
  $includeMe: Boolean
  $searchText: String
) {
  ...ChannelCreateOrUpdate_friends_1KCjMM
}

fragment ChannelCreateOrUpdate_friends_1KCjMM on Query {
  friends(first: $first, after: $after, searchText: $searchText, includeMe: $includeMe) {
    edges {
      cursor
      node {
        id
        nickname
        name
        thumbURL
        photoURL
        ...UserListItem_user
        __typename
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}

fragment UserListItem_user on User {
  id
  photoURL
  nickname
  name
  statusMessage
  isOnline
  hasBlocked
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "includeMe"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "searchText"
  }
],
v1 = [
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChannelCreateOrUpdateFriendsPaginationQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "ChannelCreateOrUpdate_friends"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChannelCreateOrUpdateFriendsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                    "name": "thumbURL",
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
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
        "args": (v1/*: any*/),
        "filters": [
          "searchText",
          "includeMe"
        ],
        "handle": "connection",
        "key": "ChannelCreateOrUpdate_friends",
        "kind": "LinkedHandle",
        "name": "friends"
      }
    ]
  },
  "params": {
    "cacheID": "dc2884ef52dd252e553fa3c96fc80f4e",
    "id": null,
    "metadata": {},
    "name": "ChannelCreateOrUpdateFriendsPaginationQuery",
    "operationKind": "query",
    "text": "query ChannelCreateOrUpdateFriendsPaginationQuery(\n  $after: String\n  $first: Int!\n  $includeMe: Boolean\n  $searchText: String\n) {\n  ...ChannelCreateOrUpdate_friends_1KCjMM\n}\n\nfragment ChannelCreateOrUpdate_friends_1KCjMM on Query {\n  friends(first: $first, after: $after, searchText: $searchText, includeMe: $includeMe) {\n    edges {\n      cursor\n      node {\n        id\n        nickname\n        name\n        thumbURL\n        photoURL\n        ...UserListItem_user\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment UserListItem_user on User {\n  id\n  photoURL\n  nickname\n  name\n  statusMessage\n  isOnline\n  hasBlocked\n}\n"
  }
};
})();
(node as any).hash = '7805b4d37080d0d8b2128e36a675a211';
export default node;
