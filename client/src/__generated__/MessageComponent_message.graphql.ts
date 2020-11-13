/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MessageComponent_message = {
    readonly messages: {
        readonly edges: ReadonlyArray<{
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly messageType: unknown;
                readonly text: string | null;
                readonly imageUrls: ReadonlyArray<string> | null;
                readonly fileUrls: ReadonlyArray<string> | null;
                readonly sender: {
                    readonly id: string;
                    readonly name: string | null;
                    readonly nickname: string | null;
                    readonly thumbURL: string | null;
                    readonly photoURL: string | null;
                };
                readonly createdAt: unknown | null;
                readonly updatedAt: unknown | null;
            };
        } | null> | null;
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly hasPreviousPage: boolean;
            readonly startCursor: string | null;
            readonly endCursor: string | null;
        };
    };
    readonly " $refType": "MessageComponent_message";
};
export type MessageComponent_message$data = MessageComponent_message;
export type MessageComponent_message$key = {
    readonly " $data"?: MessageComponent_message$data;
    readonly " $fragmentRefs": FragmentRefs<"MessageComponent_message">;
};



const node: ReaderFragment = (function () {
    var v0 = [
        "messages"
    ], v1 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
    } as any);
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
                "name": "before"
            },
            {
                "defaultValue": null,
                "kind": "LocalArgument",
                "name": "channelId"
            },
            {
                "defaultValue": null,
                "kind": "LocalArgument",
                "name": "first"
            },
            {
                "defaultValue": null,
                "kind": "LocalArgument",
                "name": "last"
            },
            {
                "defaultValue": null,
                "kind": "LocalArgument",
                "name": "searchText"
            }
        ],
        "kind": "Fragment",
        "metadata": {
            "connection": [
                {
                    "count": null,
                    "cursor": null,
                    "direction": "bidirectional",
                    "path": (v0 /*: any*/)
                }
            ],
            "refetch": {
                "connection": {
                    "forward": {
                        "count": "first",
                        "cursor": "after"
                    },
                    "backward": {
                        "count": "last",
                        "cursor": "before"
                    },
                    "path": (v0 /*: any*/)
                },
                "fragmentPathInResult": [],
                "operation": require('./MessagePaginationQuery.graphql.ts')
            }
        },
        "name": "MessageComponent_message",
        "selections": [
            {
                "alias": "messages",
                "args": [
                    {
                        "kind": "Variable",
                        "name": "channelId",
                        "variableName": "channelId"
                    },
                    {
                        "kind": "Variable",
                        "name": "searchText",
                        "variableName": "searchText"
                    }
                ],
                "concreteType": "MessageConnection",
                "kind": "LinkedField",
                "name": "__MessageComponent_messages_connection",
                "plural": false,
                "selections": [
                    {
                        "alias": null,
                        "args": null,
                        "concreteType": "MessageEdge",
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
                                "concreteType": "Message",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                    (v1 /*: any*/),
                                    {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "messageType",
                                        "storageKey": null
                                    },
                                    {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "text",
                                        "storageKey": null
                                    },
                                    {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "imageUrls",
                                        "storageKey": null
                                    },
                                    {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "fileUrls",
                                        "storageKey": null
                                    },
                                    {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "User",
                                        "kind": "LinkedField",
                                        "name": "sender",
                                        "plural": false,
                                        "selections": [
                                            (v1 /*: any*/),
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
                                            }
                                        ],
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
                                "name": "hasPreviousPage",
                                "storageKey": null
                            },
                            {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "startCursor",
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
(node as any).hash = 'e1b999570136b75c08a1521d99641a4e';
export default node;
