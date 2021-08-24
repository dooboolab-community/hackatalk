/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import ChannelCreateFriendsPaginationQuery from "./ChannelCreateFriendsPaginationQuery.graphql";
import { FragmentRefs } from "relay-runtime";
export type ChannelCreate_friends = {
    readonly friends: {
        readonly edges: ReadonlyArray<{
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly nickname: string | null;
                readonly name: string | null;
                readonly thumbURL: string | null;
                readonly photoURL: string | null;
                readonly " $fragmentRefs": FragmentRefs<"UserListItem_user">;
            } | null;
        } | null> | null;
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly endCursor: string | null;
        };
    } | null;
    readonly " $refType": "ChannelCreate_friends";
};
export type ChannelCreate_friends$data = ChannelCreate_friends;
export type ChannelCreate_friends$key = {
    readonly " $data"?: ChannelCreate_friends$data;
    readonly " $fragmentRefs": FragmentRefs<"ChannelCreate_friends">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "friends"
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
      "operation": ChannelCreateFriendsPaginationQuery
    }
  },
  "name": "ChannelCreate_friends",
  "selections": [
    {
      "alias": "friends",
      "args": [
        {
          "kind": "Variable",
          "name": "searchText",
          "variableName": "searchText"
        }
      ],
      "concreteType": "UserConnection",
      "kind": "LinkedField",
      "name": "__ChannelCreate_friends_connection",
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
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "UserListItem_user"
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
(node as any).hash = '73e8bfa8c367386edf73dea6e61ed543';
export default node;
