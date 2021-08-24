/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UserUpdateInput = {
    email?: string | null;
    name?: string | null;
    nickname?: string | null;
    thumbURL?: string | null;
    photoURL?: string | null;
    birthday?: unknown | null;
    phone?: string | null;
    statusMessage?: string | null;
    gender?: unknown | null;
};
export type UserUpdateProfileMutationVariables = {
    user: UserUpdateInput;
};
export type UserUpdateProfileMutationResponse = {
    readonly updateProfile: {
        readonly name: string | null;
        readonly nickname: string | null;
        readonly statusMessage: string | null;
    } | null;
};
export type UserUpdateProfileMutation = {
    readonly response: UserUpdateProfileMutationResponse;
    readonly variables: UserUpdateProfileMutationVariables;
};



/*
mutation UserUpdateProfileMutation(
  $user: UserUpdateInput!
) {
  updateProfile(user: $user) {
    name
    nickname
    statusMessage
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "user"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "user",
        "variableName": "user"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "updateProfile",
    "plural": false,
    "selections": [
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
        "name": "statusMessage",
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
    "name": "UserUpdateProfileMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserUpdateProfileMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c80b477a80d01190b33947329887fc8a",
    "id": null,
    "metadata": {},
    "name": "UserUpdateProfileMutation",
    "operationKind": "mutation",
    "text": "mutation UserUpdateProfileMutation(\n  $user: UserUpdateInput!\n) {\n  updateProfile(user: $user) {\n    name\n    nickname\n    statusMessage\n  }\n}\n"
  }
};
})();
(node as any).hash = '43eb9f16e3f55b1eb7cb8c5ed83fc964';
export default node;
