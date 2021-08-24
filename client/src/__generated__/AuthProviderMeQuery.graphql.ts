/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type AuthType = "apple" | "email" | "facebook" | "google";
export type AuthProviderMeQueryVariables = {};
export type AuthProviderMeQueryResponse = {
    readonly me: {
        readonly id: string;
        readonly email: string | null;
        readonly verified: boolean | null;
        readonly profile: {
            readonly socialId: string | null;
            readonly authType: AuthType | null;
        } | null;
    } | null;
};
export type AuthProviderMeQuery = {
    readonly response: AuthProviderMeQueryResponse;
    readonly variables: AuthProviderMeQueryVariables;
};



/*
query AuthProviderMeQuery {
  me {
    id
    email
    verified
    profile {
      socialId
      authType
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "me",
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
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "verified",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Profile",
        "kind": "LinkedField",
        "name": "profile",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "socialId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "authType",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuthProviderMeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AuthProviderMeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "adc59e55f2b1217c3b7f056ce8462f65",
    "id": null,
    "metadata": {},
    "name": "AuthProviderMeQuery",
    "operationKind": "query",
    "text": "query AuthProviderMeQuery {\n  me {\n    id\n    email\n    verified\n    profile {\n      socialId\n      authType\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'db26cc1b346f5db0fdbcd497d3d20728';
export default node;
