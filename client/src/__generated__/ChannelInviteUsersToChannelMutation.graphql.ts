/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ChannelInviteUsersToChannelMutationVariables = {
    channelId: string;
    userIds: Array<string>;
};
export type ChannelInviteUsersToChannelMutationResponse = {
    readonly inviteUsersToChannel: {
        readonly id: string;
        readonly channelType: unknown;
        readonly name: string | null;
        readonly lastMessageId: string | null;
    } | null;
};
export type ChannelInviteUsersToChannelMutation = {
    readonly response: ChannelInviteUsersToChannelMutationResponse;
    readonly variables: ChannelInviteUsersToChannelMutationVariables;
};



/*
mutation ChannelInviteUsersToChannelMutation(
  $channelId: String!
  $userIds: [String!]!
) {
  inviteUsersToChannel(channelId: $channelId, userIds: $userIds) {
    id
    channelType
    name
    lastMessageId
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "channelId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userIds"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "channelId",
        "variableName": "channelId"
      },
      {
        "kind": "Variable",
        "name": "userIds",
        "variableName": "userIds"
      }
    ],
    "concreteType": "Channel",
    "kind": "LinkedField",
    "name": "inviteUsersToChannel",
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
        "name": "lastMessageId",
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
    "name": "ChannelInviteUsersToChannelMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChannelInviteUsersToChannelMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2a4ba9cccdaa425e97adb953c0e171c6",
    "id": null,
    "metadata": {},
    "name": "ChannelInviteUsersToChannelMutation",
    "operationKind": "mutation",
    "text": "mutation ChannelInviteUsersToChannelMutation(\n  $channelId: String!\n  $userIds: [String!]!\n) {\n  inviteUsersToChannel(channelId: $channelId, userIds: $userIds) {\n    id\n    channelType\n    name\n    lastMessageId\n  }\n}\n"
  }
};
})();
(node as any).hash = '6fb362134db430ce65273872c290209a';
export default node;
