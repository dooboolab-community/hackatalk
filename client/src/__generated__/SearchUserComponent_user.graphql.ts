/**
 * @generated SignedSource<<5389e970ab6cb9c8e65437a571a1a04c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {ReaderFragment, RefetchableFragment} from 'relay-runtime';

import {FragmentRefs} from 'relay-runtime';

export type SearchUserComponent_user$data = {
  readonly users: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly ' $fragmentSpreads': FragmentRefs<
          'ProfileModal_user' | 'UserListItem_user'
        >;
      } | null;
    } | null> | null;
    readonly pageInfo: {
      readonly hasNextPage: boolean;
      readonly endCursor: string | null;
    };
  } | null;
  readonly ' $fragmentType': 'SearchUserComponent_user';
};
export type SearchUserComponent_user = SearchUserComponent_user$data;
export type SearchUserComponent_user$key = {
  readonly ' $data'?: SearchUserComponent_user$data;
  readonly ' $fragmentSpreads': FragmentRefs<'SearchUserComponent_user'>;
};

const node: ReaderFragment = (function () {
  var v0 = ['users'];
  return {
    argumentDefinitions: [
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
    kind: 'Fragment',
    metadata: {
      connection: [
        {
          count: 'first',
          cursor: 'after',
          direction: 'forward',
          path: v0 /*: any*/,
        },
      ],
      refetch: {
        connection: {
          forward: {
            count: 'first',
            cursor: 'after',
          },
          backward: null,
          path: v0 /*: any*/,
        },
        fragmentPathInResult: [],
        operation: require('./SearchUsersQuery.graphql'),
      },
    },
    name: 'SearchUserComponent_user',
    selections: [
      {
        alias: 'users',
        args: [
          {
            kind: 'Variable',
            name: 'searchText',
            variableName: 'searchText',
          },
        ],
        concreteType: 'UserConnection',
        kind: 'LinkedField',
        name: '__SearchUserComponent_users_connection',
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
                    args: null,
                    kind: 'FragmentSpread',
                    name: 'ProfileModal_user',
                  },
                  {
                    args: null,
                    kind: 'FragmentSpread',
                    name: 'UserListItem_user',
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
    ],
    type: 'Query',
    abstractKey: null,
  };
})();

(node as any).hash = '691c234f491eb78cb6d7de46bd948e49';

export default node;
