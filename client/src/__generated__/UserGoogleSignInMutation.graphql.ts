/**
 * @generated SignedSource<<26d138b62d460574ffd89fcaaf80d44d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserGoogleSignInMutation$variables = {
  accessToken: string;
};
export type UserGoogleSignInMutation$data = {
  readonly signInWithGoogle: {
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
export type UserGoogleSignInMutation = {
  variables: UserGoogleSignInMutation$variables;
  response: UserGoogleSignInMutation$data;
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
    "name": "signInWithGoogle",
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
    "name": "UserGoogleSignInMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserGoogleSignInMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d6a909fad00dcffef311875a1813fa85",
    "id": null,
    "metadata": {},
    "name": "UserGoogleSignInMutation",
    "operationKind": "mutation",
    "text": "mutation UserGoogleSignInMutation(\n  $accessToken: String!\n) {\n  signInWithGoogle(accessToken: $accessToken) {\n    token\n    user {\n      id\n      email\n      name\n      photoURL\n      verified\n      profile {\n        authType\n        organization\n        about\n        projects\n        positions\n        speakings\n        contributions\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ce29b536675f5a5842648aa367d8ec1e";

export default node;
