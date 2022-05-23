/**
 * @generated SignedSource<<f0e8d3f71ed38fbe18fc01fbf81a44df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserFacebookSignInMutation$variables = {
  accessToken: string;
};
export type UserFacebookSignInMutation$data = {
  readonly signInWithFacebook: {
    readonly token: string;
    readonly user: {
      readonly id: string;
      readonly email: string | null;
      readonly name: string | null;
      readonly photoURL: string | null;
      readonly verified: boolean | null;
      readonly profile: {
        readonly authType: any | null;
        readonly organization: string | null;
        readonly about: string | null;
        readonly projects: string | null;
        readonly positions: string | null;
        readonly speakings: string | null;
        readonly contributions: string | null;
      } | null;
    };
  };
};
export type UserFacebookSignInMutation = {
  variables: UserFacebookSignInMutation$variables;
  response: UserFacebookSignInMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "accessToken"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "accessToken",
        "variableName": "accessToken"
      }
    ],
    "concreteType": "AuthPayload",
    "kind": "LinkedField",
    "name": "signInWithFacebook",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
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
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "photoURL",
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
                "name": "authType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "organization",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "about",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "projects",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "positions",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "speakings",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "contributions",
                "storageKey": null
              }
            ],
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserFacebookSignInMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserFacebookSignInMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a4566639bb41300f893625abe0905b1b",
    "id": null,
    "metadata": {},
    "name": "UserFacebookSignInMutation",
    "operationKind": "mutation",
    "text": "mutation UserFacebookSignInMutation(\n  $accessToken: String!\n) {\n  signInWithFacebook(accessToken: $accessToken) {\n    token\n    user {\n      id\n      email\n      name\n      photoURL\n      verified\n      profile {\n        authType\n        organization\n        about\n        projects\n        positions\n        speakings\n        contributions\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0e82f3aaa7af01905ad16dd4ede3edf7";

export default node;
