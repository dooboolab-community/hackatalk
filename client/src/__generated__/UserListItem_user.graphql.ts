/**
 * @generated SignedSource<<26f54cd8ad779ee758c61a501dc8656a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserListItem_user$data = {
  readonly id: string;
  readonly photoURL: string | null;
  readonly nickname: string | null;
  readonly name: string | null;
  readonly statusMessage: string | null;
  readonly isOnline: boolean | null;
  readonly hasBlocked: boolean | null;
  readonly " $fragmentType": "UserListItem_user";
};
export type UserListItem_user$key = {
  readonly " $data"?: UserListItem_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserListItem_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserListItem_user",
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
      "name": "photoURL",
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
      "name": "statusMessage",
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
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "8f20a5ce5eac95c0ed889c6c0a4a316d";

export default node;
