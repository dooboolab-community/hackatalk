/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {ConcreteRequest} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type MainStackNavigatorOnMessageSubscriptionVariables = {
  deviceKey: string;
};
export type MainStackNavigatorOnMessageSubscriptionResponse = {
  readonly onMessage: {
    readonly id: string;
    readonly imageUrls: ReadonlyArray<string | null> | null;
    readonly channel: {
      readonly id: string;
      readonly lastMessage: {
        readonly id: string;
        readonly messageType: unknown;
        readonly text: string | null;
        readonly imageUrls: ReadonlyArray<string | null> | null;
        readonly fileUrls: ReadonlyArray<string | null> | null;
        readonly createdAt: unknown | null;
      } | null;
      readonly memberships: ReadonlyArray<{
        readonly user: {
          readonly name: string | null;
          readonly nickname: string | null;
          readonly thumbURL: string | null;
          readonly photoURL: string | null;
        } | null;
      }> | null;
    } | null;
    readonly sender: {
      readonly id: string;
      readonly name: string | null;
      readonly nickname: string | null;
    } | null;
    readonly createdAt: unknown | null;
    readonly ' $fragmentRefs': FragmentRefs<'MessageListItem_message'>;
  } | null;
};
export type MainStackNavigatorOnMessageSubscription = {
  readonly response: MainStackNavigatorOnMessageSubscriptionResponse;
  readonly variables: MainStackNavigatorOnMessageSubscriptionVariables;
};

/*
subscription MainStackNavigatorOnMessageSubscription(
  $deviceKey: String!
) {
  onMessage(deviceKey: $deviceKey) {
    id
    imageUrls
    channel {
      id
      lastMessage {
        id
        messageType
        text
        imageUrls
        fileUrls
        createdAt
      }
      memberships(excludeMe: true) {
        user {
          name
          nickname
          thumbURL
          photoURL
        }
      }
    }
    sender {
      id
      name
      nickname
    }
    createdAt
    ...MessageListItem_message
  }
}

fragment MessageListItem_message on Message {
  id
  messageType
  text
  imageUrls
  fileUrls
  createdAt
  updatedAt
  sender {
    id
    name
    nickname
    thumbURL
    ...ProfileModal_user
  }
}

fragment ProfileModal_user on User {
  id
  photoURL
  name
  nickname
  hasBlocked
  statusMessage
  isFriend
}
*/

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'deviceKey',
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'deviceKey',
        variableName: 'deviceKey',
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'imageUrls',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'messageType',
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'text',
      storageKey: null,
    },
    v6 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'fileUrls',
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'createdAt',
      storageKey: null,
    },
    v8 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v9 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'nickname',
      storageKey: null,
    },
    v10 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'thumbURL',
      storageKey: null,
    },
    v11 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'photoURL',
      storageKey: null,
    },
    v12 = {
      alias: null,
      args: null,
      concreteType: 'Channel',
      kind: 'LinkedField',
      name: 'channel',
      plural: false,
      selections: [
        v2 /*: any*/,
        {
          alias: null,
          args: null,
          concreteType: 'Message',
          kind: 'LinkedField',
          name: 'lastMessage',
          plural: false,
          selections: [
            v2 /*: any*/,
            v4 /*: any*/,
            v5 /*: any*/,
            v3 /*: any*/,
            v6 /*: any*/,
            v7 /*: any*/,
          ],
          storageKey: null,
        },
        {
          alias: null,
          args: [
            {
              kind: 'Literal',
              name: 'excludeMe',
              value: true,
            },
          ],
          concreteType: 'Membership',
          kind: 'LinkedField',
          name: 'memberships',
          plural: true,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'User',
              kind: 'LinkedField',
              name: 'user',
              plural: false,
              selections: [
                v8 /*: any*/,
                v9 /*: any*/,
                v10 /*: any*/,
                v11 /*: any*/,
              ],
              storageKey: null,
            },
          ],
          storageKey: 'memberships(excludeMe:true)',
        },
      ],
      storageKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'MainStackNavigatorOnMessageSubscription',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'Message',
          kind: 'LinkedField',
          name: 'onMessage',
          plural: false,
          selections: [
            v2 /*: any*/,
            v3 /*: any*/,
            v12 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: 'User',
              kind: 'LinkedField',
              name: 'sender',
              plural: false,
              selections: [v2 /*: any*/, v8 /*: any*/, v9 /*: any*/],
              storageKey: null,
            },
            v7 /*: any*/,
            {
              args: null,
              kind: 'FragmentSpread',
              name: 'MessageListItem_message',
            },
          ],
          storageKey: null,
        },
      ],
      type: 'Subscription',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'MainStackNavigatorOnMessageSubscription',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'Message',
          kind: 'LinkedField',
          name: 'onMessage',
          plural: false,
          selections: [
            v2 /*: any*/,
            v3 /*: any*/,
            v12 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: 'User',
              kind: 'LinkedField',
              name: 'sender',
              plural: false,
              selections: [
                v2 /*: any*/,
                v8 /*: any*/,
                v9 /*: any*/,
                v10 /*: any*/,
                v11 /*: any*/,
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'hasBlocked',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'statusMessage',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'isFriend',
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v7 /*: any*/,
            v4 /*: any*/,
            v5 /*: any*/,
            v6 /*: any*/,
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'updatedAt',
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '951cceae47651853d1d1fbb8cbb1a968',
      id: null,
      metadata: {},
      name: 'MainStackNavigatorOnMessageSubscription',
      operationKind: 'subscription',
      text: 'subscription MainStackNavigatorOnMessageSubscription(\n  $deviceKey: String!\n) {\n  onMessage(deviceKey: $deviceKey) {\n    id\n    imageUrls\n    channel {\n      id\n      lastMessage {\n        id\n        messageType\n        text\n        imageUrls\n        fileUrls\n        createdAt\n      }\n      memberships(excludeMe: true) {\n        user {\n          name\n          nickname\n          thumbURL\n          photoURL\n        }\n      }\n    }\n    sender {\n      id\n      name\n      nickname\n    }\n    createdAt\n    ...MessageListItem_message\n  }\n}\n\nfragment MessageListItem_message on Message {\n  id\n  messageType\n  text\n  imageUrls\n  fileUrls\n  createdAt\n  updatedAt\n  sender {\n    id\n    name\n    nickname\n    thumbURL\n    ...ProfileModal_user\n  }\n}\n\nfragment ProfileModal_user on User {\n  id\n  photoURL\n  name\n  nickname\n  hasBlocked\n  statusMessage\n  isFriend\n}\n',
    },
  };
})();
(node as any).hash = '813efae8c9cb3380c2ce3aa4248109d3';
export default node;
