/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchUsersPaginationQueryVariables = {
    first: number;
    after?: string | null;
<<<<<<< HEAD
    searchText?: string | null;
=======
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
};
export type SearchUsersPaginationQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"SearchUserComponent_user">;
};
export type SearchUsersPaginationQuery = {
    readonly response: SearchUsersPaginationQueryResponse;
    readonly variables: SearchUsersPaginationQueryVariables;
};



/*
query SearchUsersPaginationQuery(
  $first: Int!
  $after: String
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
    var v0 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "after"
    } as any), v1 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "first"
<<<<<<< HEAD
    } as any), v2 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "searchText"
    } as any), v3 = [
=======
    } as any), v2 = [
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
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
            "argumentDefinitions": [
                (v0 /*: any*/),
<<<<<<< HEAD
                (v1 /*: any*/),
                (v2 /*: any*/)
=======
                (v1 /*: any*/)
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
            ],
            "kind": "Fragment",
            "metadata": null,
            "name": "SearchUsersPaginationQuery",
            "selections": [
                {
<<<<<<< HEAD
                    "args": (v3 /*: any*/),
=======
                    "args": (v2 /*: any*/),
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
                    "kind": "FragmentSpread",
                    "name": "SearchUserComponent_user"
                }
            ],
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [
                (v1 /*: any*/),
<<<<<<< HEAD
                (v0 /*: any*/),
                (v2 /*: any*/)
=======
                (v0 /*: any*/)
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
            ],
            "kind": "Operation",
            "name": "SearchUsersPaginationQuery",
            "selections": [
                {
                    "alias": null,
<<<<<<< HEAD
                    "args": (v3 /*: any*/),
=======
                    "args": (v2 /*: any*/),
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
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
<<<<<<< HEAD
                    "args": (v3 /*: any*/),
                    "filters": [
                        "searchText"
                    ],
=======
                    "args": (v2 /*: any*/),
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
            "cacheID": "a9475c3c096d79b04c382826a1bf66c6",
=======
            "cacheID": "947932f9038ce313e8c76478e5c7c491",
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
            "id": null,
            "metadata": {},
            "name": "SearchUsersPaginationQuery",
            "operationKind": "query",
<<<<<<< HEAD
            "text": "query SearchUsersPaginationQuery(\n  $first: Int!\n  $after: String\n  $searchText: String\n) {\n  ...SearchUserComponent_user_2yyznZ\n}\n\nfragment SearchUserComponent_user_2yyznZ on Query {\n  users(first: $first, after: $after, searchText: $searchText) {\n    edges {\n      cursor\n      node {\n        id\n        email\n        name\n        nickname\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '7b94ab6686806e71ed4cdd82cacc3c66';
=======
            "text": "query SearchUsersPaginationQuery(\n  $first: Int!\n  $after: String\n) {\n  ...SearchUserComponent_user_2HEEH6\n}\n\nfragment SearchUserComponent_user_2HEEH6 on Query {\n  users(first: $first, after: $after) {\n    edges {\n      cursor\n      node {\n        id\n        email\n        name\n        nickname\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '80162028d7a368db9709a7599952d7f1';
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
export default node;
