/**
 * @generated SignedSource<<2508a9d5a52d51c8ea247e533ebdf9c7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessageListItem_message$data = {
  readonly id: string;
  readonly messageType: any;
  readonly text: string | null;
  readonly imageUrls: ReadonlyArray<string | null> | null;
  readonly fileUrls: ReadonlyArray<string | null> | null;
  readonly createdAt: any | null;
  readonly updatedAt: any | null;
  readonly sender: {
    readonly id: string;
    readonly name: string | null;
    readonly nickname: string | null;
    readonly thumbURL: string | null;
    readonly photoURL: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"ProfileModal_user">;
  } | null;
  readonly " $fragmentType": "MessageListItem_message";
};
export type MessageListItem_message = MessageListItem_message$data;
export type MessageListItem_message$key = {
  readonly " $data"?: MessageListItem_message$data;
  readonly " $fragmentSpreads": FragmentRefs<"MessageListItem_message">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MessageListItem_message",
  "selections": [
    (v0/*: any*/),
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
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "sender",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "ProfileModal_user"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Message",
  "abstractKey": null
};
})();

(node as any).hash = "10bedc96c4bff58d435919c95263433b";

export default node;
