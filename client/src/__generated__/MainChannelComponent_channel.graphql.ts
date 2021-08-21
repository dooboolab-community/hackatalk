/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import Channels from "./Channels.graphql";
import { FragmentRefs } from "relay-runtime";
export type MainChannelComponent_channel = {
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
                    readonly id: string;
                    readonly messageType: unknown;
                    readonly text: string | null;
                    readonly imageUrls: ReadonlyArray<string | null> | null;
                    readonly fileUrls: ReadonlyArray<string | null> | null;
                    readonly createdAt: unknown | null;
                } | null;
            } | null;
        } | null> | null;
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly endCursor: string | null;
        };
    } | null;
    readonly " $refType": "MainChannelComponent_channel";
};
export type MainChannelComponent_channel$data = MainChannelComponent_channel;
export type MainChannelComponent_channel$key = {
    readonly " $data"?: MainChannelComponent_channel$data;
    readonly " $fragmentRefs": FragmentRefs<"MainChannelComponent_channel">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "channels"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
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
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": Channels
    }
  },
  "name": "MainChannelComponent_channel",
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
      "name": "__MainChannelComponent_channels_connection",
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
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "channelType",
                  "storageKey": null
                },
                (v2/*: any*/),
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "excludeMe",
                      "value": false
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
                        (v2/*: any*/),
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
                  "storageKey": "memberships(excludeMe:false)"
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Message",
                  "kind": "LinkedField",
                  "name": "lastMessage",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
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
};
})();
(node as any).hash = 'fcd7dced0658bdf5011e46ed25d0c275';
export default node;
