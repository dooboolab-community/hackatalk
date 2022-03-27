/**
 * @generated SignedSource<<1e63385766e287ca30d1471b0bc88e04>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ChannelLeaveChannelMutation$variables = {
  channelId: string;
};
export type ChannelLeaveChannelMutation$data = {
  readonly leaveChannel: {
    readonly user: {
      readonly id: string;
    } | null;
    readonly channel: {
      readonly id: string;
    } | null;
    readonly alertMode: any | null;
    readonly isVisible: boolean | null;
  } | null;
};
export type ChannelLeaveChannelMutation = {
  variables: ChannelLeaveChannelMutation$variables;
  response: ChannelLeaveChannelMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "channelId"
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
],
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "channelId",
        "variableName": "channelId"
      }
    ],
    "concreteType": "Membership",
    "kind": "LinkedField",
    "name": "leaveChannel",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Channel",
        "kind": "LinkedField",
        "name": "channel",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "alertMode",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isVisible",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChannelLeaveChannelMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChannelLeaveChannelMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "85c4bf03a5d4e2472c7d944ffc87c1c7",
    "id": null,
    "metadata": {},
    "name": "ChannelLeaveChannelMutation",
    "operationKind": "mutation",
    "text": "mutation ChannelLeaveChannelMutation(\n  $channelId: String!\n) {\n  leaveChannel(channelId: $channelId) {\n    user {\n      id\n    }\n    channel {\n      id\n    }\n    alertMode\n    isVisible\n  }\n}\n"
  }
};
})();

(node as any).hash = "f14db2f53f6c571a0f9d7f3a083bc7a5";

export default node;
