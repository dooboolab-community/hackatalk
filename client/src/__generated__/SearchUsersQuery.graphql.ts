/**
 * @generated SignedSource<<fed78b248b506b4021de9d1ddf0fb96b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {ConcreteRequest, Query} from 'relay-runtime';

import {FragmentRefs} from 'relay-runtime';

export type SearchUsersQuery$variables = {
  after?: string | null;
  first?: number | null;
  searchText?: string | null;
};
export type SearchUsersQueryVariables = SearchUsersQuery$variables;
export type SearchUsersQuery$data = {
  readonly ' $fragmentSpreads': FragmentRefs<'SearchUserComponent_user'>;
};
export type SearchUsersQueryResponse = SearchUsersQuery$data;
export type SearchUsersQuery = {
  variables: SearchUsersQueryVariables;
  response: SearchUsersQuery$data;
};

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
        name: 'searchText',
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
        name: 'searchText',
        variableName: 'searchText',
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'SearchUsersQuery',
      selections: [
        {
          args: v1 /*: any*/,
          kind: 'FragmentSpread',
          name: 'SearchUserComponent_user',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'SearchUsersQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'UserConnection',
          kind: 'LinkedField',
          name: 'users',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'UserEdge',
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
                  concreteType: 'User',
                  kind: 'LinkedField',
                  name: 'node',
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'id',
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'photoURL',
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'name',
                      storageKey: null,
                    },
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
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'isOnline',
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
          filters: ['searchText'],
          handle: 'connection',
          key: 'SearchUserComponent_users',
          kind: 'LinkedHandle',
          name: 'users',
        },
      ],
    },
    params: {
      cacheID: '675d2dbb817a4ab1d9db23cba3b055b0',
      id: null,
      metadata: {},
      name: 'SearchUsersQuery',
      operationKind: 'query',
      text: 'query SearchUsersQuery(\n  $after: String\n  $first: Int\n  $searchText: String\n) {\n  ...SearchUserComponent_user_2yyznZ\n}\n\nfragment ProfileModal_user on User {\n  id\n  photoURL\n  name\n  nickname\n  hasBlocked\n  statusMessage\n  isFriend\n}\n\nfragment SearchUserComponent_user_2yyznZ on Query {\n  users(first: $first, after: $after, searchText: $searchText) {\n    edges {\n      cursor\n      node {\n        id\n        ...ProfileModal_user\n        ...UserListItem_user\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment UserListItem_user on User {\n  id\n  photoURL\n  nickname\n  name\n  statusMessage\n  isOnline\n  hasBlocked\n}\n',
    },
  };
})();

(node as any).hash = '691c234f491eb78cb6d7de46bd948e49';

export default node;
