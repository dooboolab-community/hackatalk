/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchUsersQueryVariables = {
    after?: string | null;
    first?: number | null;
<<<<<<< HEAD
    searchText?: string | null;
=======
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
};
export type SearchUsersQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"SearchUserComponent_user">;
};
export type SearchUsersQuery = {
    readonly response: SearchUsersQueryResponse;
    readonly variables: SearchUsersQueryVariables;
};



/*
query SearchUsersQuery(
  $after: String
  $first: Int
<<<<<<< HEAD
  $searchText: String
) {
  ...SearchUserComponent_user_2yyznZ
}

fragment SearchUserComponent_user_2yyznZ on Query {
  users(first: $first, after: $after, searchText: $searchText) {
=======
) {
  ...SearchUserComponent_user_2HEEH6
}

fragment SearchUserComponent_user_2HEEH6 on Query {
  users(first: $first, after: $after) {
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
    edges {
      cursor
      node {
        id
        email
        name
        nickname
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
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "after"
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "first"
<<<<<<< HEAD
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "searchText"
=======
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
        } as any)
    ], v1 = [
        ({
            "kind": "Variable",
            "name": "after",
            "variableName": "after"
        } as any),
        ({
            "kind": "Variable",
            "name": "first",
            "variableName": "first"
<<<<<<< HEAD
        } as any),
        ({
            "kind": "Variable",
            "name": "searchText",
            "variableName": "searchText"
=======
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "SearchUsersQuery",
            "selections": [
                {
                    "args": (v1 /*: any*/),
                    "kind": "FragmentSpread",
                    "name": "SearchUserComponent_user"
                }
            ],
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "SearchUsersQuery",
            "selections": [
                {
                    "alias": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "UserConnection",
                    "kind": "LinkedField",
                    "name": "users",
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
                    "args": (v1 /*: any*/),
<<<<<<< HEAD
                    "filters": [
                        "searchText"
                    ],
=======
                    "filters": null,
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
                    "handle": "connection",
                    "key": "SearchUserComponent_users",
                    "kind": "LinkedHandle",
                    "name": "users"
                }
            ]
        },
        "params": {
<<<<<<< HEAD
            "cacheID": "28b83e6473fd7f1205e06d0d5d9d4503",
=======
            "cacheID": "e89fd7a19d80887a34404427c567c9b5",
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
            "id": null,
            "metadata": {},
            "name": "SearchUsersQuery",
            "operationKind": "query",
<<<<<<< HEAD
            "text": "query SearchUsersQuery(\n  $after: String\n  $first: Int\n  $searchText: String\n) {\n  ...SearchUserComponent_user_2yyznZ\n}\n\nfragment SearchUserComponent_user_2yyznZ on Query {\n  users(first: $first, after: $after, searchText: $searchText) {\n    edges {\n      cursor\n      node {\n        id\n        email\n        name\n        nickname\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '333aa95686b149c6754061e2f3db02b1';
=======
            "text": "query SearchUsersQuery(\n  $after: String\n  $first: Int\n) {\n  ...SearchUserComponent_user_2HEEH6\n}\n\nfragment SearchUserComponent_user_2HEEH6 on Query {\n  users(first: $first, after: $after) {\n    edges {\n      cursor\n      node {\n        id\n        email\n        name\n        nickname\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '1bbcbccd97d9215b403f3274ce352022';
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
export default node;
