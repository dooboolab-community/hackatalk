/**
 * @generated SignedSource<<98b250e957b5fd2903dd32792b4aca29>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {ConcreteRequest, Query} from 'relay-runtime';

import {FragmentRefs} from 'relay-runtime';

export type Channels$variables = {
  after?: string | null;
  first: number;
  withMessage?: boolean | null;
};
export type ChannelsVariables = Channels$variables;
export type Channels$data = {
  readonly ' $fragmentSpreads': FragmentRefs<'MainChannelComponent_channel'>;
};
export type ChannelsResponse = Channels$data;
export type Channels = {
  variables: ChannelsVariables;
  response: Channels$data;
};

/*
query Channels(
  $after: String
  $first: Int!
  $withMessage: Boolean
) {
  ...MainChannelComponent_channel_4q1LXA
}

fragment MainChannelComponent_channel_4q1LXA on Query {
  channels(first: $first, after: $after, withMessage: $withMessage) {
    edges {
      cursor
      node {
        id
        channelType
        name
        memberships(excludeMe: false) {
          user {
            id
            name
            nickname
            thumbURL
            photoURL
          }
        }
        lastMessage {
          id
          messageType
          text
          imageUrls
          fileUrls
          createdAt
          deletedAt
        }
        __typename
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
*/

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'after',
      },
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'first',
      },
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'withMessage',
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'after',
        variableName: 'after',
      },
      {
        kind: 'Variable',
        name: 'first',
        variableName: 'first',
      },
      {
        kind: 'Variable',
        name: 'withMessage',
        variableName: 'withMessage',
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
      name: 'name',
      storageKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'Channels',
      selections: [
        {
          args: v1 /*: any*/,
          kind: 'FragmentSpread',
          name: 'MainChannelComponent_channel',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'Channels',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ChannelConnection',
          kind: 'LinkedField',
          name: 'channels',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'ChannelEdge',
              kind: 'LinkedField',
              name: 'edges',
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'cursor',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: 'Channel',
                  kind: 'LinkedField',
                  name: 'node',
                  plural: false,
                  selections: [
                    v2 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'channelType',
                      storageKey: null,
                    },
                    v3 /*: any*/,
                    {
                      alias: null,
                      args: [
                        {
                          kind: 'Literal',
                          name: 'excludeMe',
                          value: false,
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
                            v2 /*: any*/,
                            v3 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'nickname',
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'thumbURL',
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'photoURL',
                              storageKey: null,
                            },
                          ],
                          storageKey: null,
                        },
                      ],
                      storageKey: 'memberships(excludeMe:false)',
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: 'Message',
                      kind: 'LinkedField',
                      name: 'lastMessage',
                      plural: false,
                      selections: [
                        v2 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'messageType',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'text',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'imageUrls',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'fileUrls',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'createdAt',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'deletedAt',
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: '__typename',
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: 'PageInfo',
              kind: 'LinkedField',
              name: 'pageInfo',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'hasNextPage',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'endCursor',
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
        {
          alias: null,
          args: v1 /*: any*/,
          filters: ['withMessage'],
          handle: 'connection',
          key: 'MainChannelComponent_channels',
          kind: 'LinkedHandle',
          name: 'channels',
        },
      ],
    },
    params: {
      cacheID: '1ab5363ca7d40a67961c1afde7dc1d11',
      id: null,
      metadata: {},
      name: 'Channels',
      operationKind: 'query',
      text: 'query Channels(\n  $after: String\n  $first: Int!\n  $withMessage: Boolean\n) {\n  ...MainChannelComponent_channel_4q1LXA\n}\n\nfragment MainChannelComponent_channel_4q1LXA on Query {\n  channels(first: $first, after: $after, withMessage: $withMessage) {\n    edges {\n      cursor\n      node {\n        id\n        channelType\n        name\n        memberships(excludeMe: false) {\n          user {\n            id\n            name\n            nickname\n            thumbURL\n            photoURL\n          }\n        }\n        lastMessage {\n          id\n          messageType\n          text\n          imageUrls\n          fileUrls\n          createdAt\n          deletedAt\n        }\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n',
    },
  };
})();
