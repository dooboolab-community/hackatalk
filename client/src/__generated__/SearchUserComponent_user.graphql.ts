/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchUserComponent_user = {
    readonly users: {
        readonly edges: ReadonlyArray<{
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly email: string | null;
                readonly name: string | null;
                readonly nickname: string | null;
            };
        } | null> | null;
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly endCursor: string | null;
        };
    };
    readonly " $refType": "SearchUserComponent_user";
};
export type SearchUserComponent_user$data = SearchUserComponent_user;
export type SearchUserComponent_user$key = {
    readonly " $data"?: SearchUserComponent_user$data;
    readonly " $fragmentRefs": FragmentRefs<"SearchUserComponent_user">;
};



const node: ReaderFragment = (function () {
    var v0 = [
        "users"
    ];
    return {
        "argumentDefinitions": [
            {
                "defaultValue": null,
                "kind": "LocalArgument",
                "name": "after"
            },
            {
                "defaultValue": null,
                "kind": "LocalArgument",
                "name": "first"
<<<<<<< HEAD
            },
            {
                "defaultValue": null,
                "kind": "LocalArgument",
                "name": "searchText"
=======
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
            }
        ],
        "kind": "Fragment",
        "metadata": {
            "connection": [
                {
                    "count": "first",
                    "cursor": "after",
                    "direction": "forward",
                    "path": (v0 /*: any*/)
                }
            ],
            "refetch": {
                "connection": {
                    "forward": {
                        "count": "first",
                        "cursor": "after"
                    },
                    "backward": null,
                    "path": (v0 /*: any*/)
                },
                "fragmentPathInResult": [],
                "operation": require('./SearchUsersQuery.graphql.ts')
            }
        },
        "name": "SearchUserComponent_user",
        "selections": [
            {
                "alias": "users",
<<<<<<< HEAD
                "args": [
                    {
                        "kind": "Variable",
                        "name": "searchText",
                        "variableName": "searchText"
                    }
                ],
=======
                "args": null,
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
                "concreteType": "UserConnection",
                "kind": "LinkedField",
                "name": "__SearchUserComponent_users_connection",
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
            }
        ],
        "type": "Query",
        "abstractKey": null
    } as any;
})();
<<<<<<< HEAD
(node as any).hash = '333aa95686b149c6754061e2f3db02b1';
=======
(node as any).hash = '1bbcbccd97d9215b403f3274ce352022';
>>>>>>> eb5d5f2... Applied relay cursor pagination in [SearchUser] (#228)
export default node;
