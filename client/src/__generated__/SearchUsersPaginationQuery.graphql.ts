/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchUsersPaginationQueryVariables = {
    first: number;
    after?: string | null;
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
) {
  ...SearchUserComponent_user_2HEEH6
}

fragment SearchUserComponent_user_2HEEH6 on Query {
  users(first: $first, after: $after) {
    edges {
      cursor
      node {
        id
        email
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
            "name": "SearchUsersPaginationQuery",
            "selections": [
                {
                    "args": (v2 /*: any*/),
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
                (v0 /*: any*/)
            ],
            "kind": "Operation",
            "name": "SearchUsersPaginationQuery",
            "selections": [
                {
                    "alias": null,
                    "args": (v2 /*: any*/),
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
                    "args": (v2 /*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "SearchUserComponent_users",
                    "kind": "LinkedHandle",
                    "name": "users"
                }
            ]
        },
        "params": {
            "cacheID": "acd65c826b9cf6586392142633b6ab60",
            "id": null,
            "metadata": {},
            "name": "SearchUsersPaginationQuery",
            "operationKind": "query",
            "text": "query SearchUsersPaginationQuery(\n  $first: Int!\n  $after: String\n) {\n  ...SearchUserComponent_user_2HEEH6\n}\n\nfragment SearchUserComponent_user_2HEEH6 on Query {\n  users(first: $first, after: $after) {\n    edges {\n      cursor\n      node {\n        id\n        email\n        nickname\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '80162028d7a368db9709a7599952d7f1';
export default node;
