/**
 * @generated SignedSource<<0bce05ec860c680279748078bcd47b83>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {ConcreteRequest, Mutation} from 'relay-runtime';
export type UserUpdateInput = {
  email?: string | null;
  name?: string | null;
  nickname?: string | null;
  thumbURL?: string | null;
  photoURL?: string | null;
  birthday?: any | null;
  phone?: string | null;
  statusMessage?: string | null;
  gender?: any | null;
};
export type UserUpdateProfileMutation$variables = {
  user: UserUpdateInput;
};
export type UserUpdateProfileMutationVariables =
  UserUpdateProfileMutation$variables;
export type UserUpdateProfileMutation$data = {
  readonly updateProfile: {
    readonly id: string;
    readonly name: string | null;
    readonly nickname: string | null;
    readonly statusMessage: string | null;
  } | null;
};
export type UserUpdateProfileMutationResponse = UserUpdateProfileMutation$data;
export type UserUpdateProfileMutation = {
  variables: UserUpdateProfileMutationVariables;
  response: UserUpdateProfileMutation$data;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'user',
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'user',
            variableName: 'user',
          },
        ],
        concreteType: 'User',
        kind: 'LinkedField',
        name: 'updateProfile',
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
            name: 'statusMessage',
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'UserUpdateProfileMutation',
      selections: v1 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'UserUpdateProfileMutation',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: '16c368269c398374db4a3fed3e3224fa',
      id: null,
      metadata: {},
      name: 'UserUpdateProfileMutation',
      operationKind: 'mutation',
      text: 'mutation UserUpdateProfileMutation(\n  $user: UserUpdateInput!\n) {\n  updateProfile(user: $user) {\n    id\n    name\n    nickname\n    statusMessage\n  }\n}\n',
    },
  };
})();

(node as any).hash = '2ddfbc52853331dac9f9f79c11ef29a5';

export default node;
