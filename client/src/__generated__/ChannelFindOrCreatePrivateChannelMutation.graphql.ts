/**
 * @generated SignedSource<<ae944dc4c13ad88eac7d74ad12b119c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ChannelFindOrCreatePrivateChannelMutation$variables = {
  peerUserIds: ReadonlyArray<string>;
};
export type ChannelFindOrCreatePrivateChannelMutation$data = {
  readonly findOrCreatePrivateChannel: {
    readonly id: string;
    readonly name: string | null;
    readonly channelType: any | null;
  } | null;
};
export type ChannelFindOrCreatePrivateChannelMutation = {
  variables: ChannelFindOrCreatePrivateChannelMutation$variables;
  response: ChannelFindOrCreatePrivateChannelMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "peerUserIds"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "peerUserIds",
        "variableName": "peerUserIds"
      }
    ],
    "concreteType": "Channel",
    "kind": "LinkedField",
    "name": "findOrCreatePrivateChannel",
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
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "channelType",
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
    "name": "ChannelFindOrCreatePrivateChannelMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChannelFindOrCreatePrivateChannelMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9120d90bec6954cdd44bed7eb33e214d",
    "id": null,
    "metadata": {},
    "name": "ChannelFindOrCreatePrivateChannelMutation",
    "operationKind": "mutation",
    "text": "mutation ChannelFindOrCreatePrivateChannelMutation(\n  $peerUserIds: [String!]!\n) {\n  findOrCreatePrivateChannel(peerUserIds: $peerUserIds) {\n    id\n    name\n    channelType\n  }\n}\n"
  }
};
})();

(node as any).hash = "075bfd59cf64c8590f62b6a68277c01d";

export default node;
