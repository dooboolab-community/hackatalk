/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ChannelLeaveChannelMutationVariables = {
    channelId: string;
};
export type ChannelLeaveChannelMutationResponse = {
    readonly leaveChannel: {
        readonly user: {
            readonly id: string;
        } | null;
        readonly channel: {
            readonly id: string;
        } | null;
        readonly alertMode: unknown | null;
    } | null;
};
export type ChannelLeaveChannelMutation = {
    readonly response: ChannelLeaveChannelMutationResponse;
    readonly variables: ChannelLeaveChannelMutationVariables;
};



/*
mutation ChannelLeaveChannelMutation(
  $channelId: String!
) {
  leaveChannel(channelId: $channelId) {
    user {
      id
    }
    channel {
      id
    }
    alertMode
  }
}
*/

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
    "cacheID": "c2233f201e4b1982446e9bb5012226c7",
    "id": null,
    "metadata": {},
    "name": "ChannelLeaveChannelMutation",
    "operationKind": "mutation",
    "text": "mutation ChannelLeaveChannelMutation(\n  $channelId: String!\n) {\n  leaveChannel(channelId: $channelId) {\n    user {\n      id\n    }\n    channel {\n      id\n    }\n    alertMode\n  }\n}\n"
  }
};
})();
(node as any).hash = '41fab9d52ba5658d1446ec3f5f307b28';
export default node;
