/**
 * @generated SignedSource<<098fa1c2ce3edb0f7c4e3a1259137c5d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
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
export type UserProfileInput = {
  organization?: string | null;
  about?: string | null;
  projects?: string | null;
  positions?: string | null;
  speakings?: string | null;
  contributions?: string | null;
};
export type UserUpdateProfileMutation$variables = {
  user: UserUpdateInput;
  profile?: UserProfileInput | null;
};
export type UserUpdateProfileMutation$data = {
  readonly updateProfile: {
    readonly id: string;
    readonly name: string | null;
    readonly nickname: string | null;
    readonly statusMessage: string | null;
  } | null;
};
export type UserUpdateProfileMutation = {
  variables: UserUpdateProfileMutation$variables;
  response: UserUpdateProfileMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "profile"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "user"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "profile",
        "variableName": "profile"
      },
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserUpdateProfileMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "UserUpdateProfileMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "aac4090c243d89ccd26deb7b659b5301",
    "id": null,
    "metadata": {},
    "name": "UserUpdateProfileMutation",
    "operationKind": "mutation",
    "text": "mutation UserUpdateProfileMutation(\n  $user: UserUpdateInput!\n  $profile: UserProfileInput\n) {\n  updateProfile(user: $user, profile: $profile) {\n    id\n    name\n    nickname\n    statusMessage\n  }\n}\n"
  }
};
})();

(node as any).hash = "2f000627960039b10b189dee7716d772";

export default node;
