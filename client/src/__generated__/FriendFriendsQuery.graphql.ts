/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FriendFriendsQueryVariables = {
    first: number;
    after?: string | null;
};
export type FriendFriendsQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"Friend_friends">;
};
export type FriendFriendsQuery = {
    readonly response: FriendFriendsQueryResponse;
    readonly variables: FriendFriendsQueryVariables;
};



/*
query FriendFriendsQuery(
  $first: Int!
  $after: String
) {
  ...Friend_friends_2HEEH6
}

fragment Friend_friends_2HEEH6 on Query {
  friends(first: $first, after: $after) {
    edges {
      cursor
      node {
        id
        email
        name
        nickname
        thumbURL
        photoURL
        birthday
        gender
        phone
        statusMessage
        verified
        lastSignedIn
        isOnline
        hasBlocked
        createdAt
        updatedAt
        deletedAt
        __typename
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "after"
    } as any), v1 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "first"
    } as any), v2 = [
        ({
            "kind": "Variable",
            "name": "after",
            "variableName": "after"
        } as any),
        ({
            "kind": "Variable",
            "name": "first",
            "variableName": "first"
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": [
                (v0 /*: any*/),
                (v1 /*: any*/)
            ],
            "kind": "Fragment",
            "metadata": null,
            "name": "FriendFriendsQuery",
            "selections": [
                {
                    "args": (v2 /*: any*/),
                    "kind": "FragmentSpread",
                    "name": "Friend_friends"
                }
            ],
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [
                (v1 /*: any*/),
                (v0 /*: any*/)
            ],
            "kind": "Operation",
            "name": "FriendFriendsQuery",
            "selections": [
                {
                    "alias": null,
                    "args": (v2 /*: any*/),
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
                                            "name": "birthday",
                                            "storageKey": null
                                        },
                                        {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "gender",
                                            "storageKey": null
                                        },
                                        {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "phone",
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
                                            "name": "lastSignedIn",
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
                                            "name": "createdAt",
                                            "storageKey": null
                                        },
                                        {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "updatedAt",
                                            "storageKey": null
                                        },
                                        {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "deletedAt",
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
                    "args": (v2 /*: any*/),
                    "filters": [],
                    "handle": "connection",
                    "key": "Friend_friends",
                    "kind": "LinkedHandle",
                    "name": "friends"
                }
            ]
        },
        "params": {
            "cacheID": "2856ed61243d25c7ef260804646917e2",
            "id": null,
            "metadata": {},
            "name": "FriendFriendsQuery",
            "operationKind": "query",
            "text": "query FriendFriendsQuery(\n  $first: Int!\n  $after: String\n) {\n  ...Friend_friends_2HEEH6\n}\n\nfragment Friend_friends_2HEEH6 on Query {\n  friends(first: $first, after: $after) {\n    edges {\n      cursor\n      node {\n        id\n        email\n        name\n        nickname\n        thumbURL\n        photoURL\n        birthday\n        gender\n        phone\n        statusMessage\n        verified\n        lastSignedIn\n        isOnline\n        hasBlocked\n        createdAt\n        updatedAt\n        deletedAt\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'e64a1228bc404df8a1731f94fa4c520a';
export default node;
