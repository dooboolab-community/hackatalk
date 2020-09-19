/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ChannelComponent_channel = {
    readonly channels: {
        readonly edges: ReadonlyArray<{
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly channelType: unknown;
                readonly name: string | null;
                readonly memberships: ReadonlyArray<{
                    readonly user: {
                        readonly name: string | null;
                        readonly nickname: string | null;
                        readonly thumbURL: string | null;
                        readonly photoURL: string | null;
                    } | null;
                }> | null;
                readonly lastMessage: {
                    readonly messageType: unknown;
                    readonly text: string | null;
                    readonly imageUrls: ReadonlyArray<string>;
                    readonly fileUrls: ReadonlyArray<string>;
                    readonly createdAt: unknown | null;
                } | null;
            };
        } | null> | null;
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly endCursor: string | null;
        };
    };
    readonly " $refType": "ChannelComponent_channel";
};
export type ChannelComponent_channel$data = ChannelComponent_channel;
export type ChannelComponent_channel$key = {
    readonly " $data"?: ChannelComponent_channel$data;
    readonly " $fragmentRefs": FragmentRefs<"ChannelComponent_channel">;
};



const node: ReaderFragment = (function () {
    var v0 = [
        "channels"
    ], v1 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
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
                "name": "first"
            },
            {
                "defaultValue": null,
                "kind": "LocalArgument",
                "name": "withMessage"
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
                "operation": require('./Channels.graphql.ts')
            }
        },
        "name": "ChannelComponent_channel",
        "selections": [
            {
                "alias": "channels",
                "args": [
                    {
                        "kind": "Variable",
                        "name": "withMessage",
                        "variableName": "withMessage"
                    }
                ],
                "concreteType": "ChannelConnection",
                "kind": "LinkedField",
                "name": "__ChannelComponent_channels_connection",
                "plural": false,
                "selections": [
                    {
                        "alias": null,
                        "args": null,
                        "concreteType": "ChannelEdge",
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
                                "concreteType": "Channel",
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
                                        "name": "channelType",
                                        "storageKey": null
                                    },
                                    (v1 /*: any*/),
                                    {
                                        "alias": null,
                                        "args": [
                                            {
                                                "kind": "Literal",
                                                "name": "excludeMe",
                                                "value": true
                                            }
                                        ],
                                        "concreteType": "Membership",
                                        "kind": "LinkedField",
                                        "name": "memberships",
                                        "plural": true,
                                        "selections": [
                                            {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "User",
                                                "kind": "LinkedField",
                                                "name": "user",
                                                "plural": false,
                                                "selections": [
                                                    (v1 /*: any*/),
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
                                            }
                                        ],
                                        "storageKey": "memberships(excludeMe:true)"
                                    },
                                    {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Message",
                                        "kind": "LinkedField",
                                        "name": "lastMessage",
                                        "plural": false,
                                        "selections": [
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
                                                "kind": "ScalarField",
                                                "name": "createdAt",
                                                "storageKey": null
                                            }
                                        ],
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
(node as any).hash = '3a6105e67244c05d4a1697cc4947c07e';
export default node;
