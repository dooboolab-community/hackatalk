/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ProfileModal_user = {
    readonly id: string;
    readonly photoURL: string | null;
    readonly name: string | null;
    readonly nickname: string | null;
    readonly hasBlocked: boolean | null;
    readonly statusMessage: string | null;
    readonly isFriend: boolean | null;
    readonly " $refType": "ProfileModal_user";
};
export type ProfileModal_user$data = ProfileModal_user;
export type ProfileModal_user$key = {
    readonly " $data"?: ProfileModal_user$data;
    readonly " $fragmentRefs": FragmentRefs<"ProfileModal_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileModal_user",
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
      "name": "hasBlocked",
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
      "name": "isFriend",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '589f433fd2a1a3c2e632de6bc8024f36';
export default node;
