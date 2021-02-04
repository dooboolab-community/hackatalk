/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AuthType = "apple" | "email" | "facebook" | "google";
export type SocialSignInButtonFacebookSignInMutationVariables = {
    accessToken: string;
};
export type SocialSignInButtonFacebookSignInMutationResponse = {
    readonly signInWithFacebook: {
        readonly token: string;
        readonly user: {
            readonly id: string;
            readonly email: string | null;
            readonly name: string | null;
            readonly photoURL: string | null;
            readonly verified: boolean | null;
            readonly profile: {
                readonly authType: AuthType | null;
            } | null;
        };
    };
};
export type SocialSignInButtonFacebookSignInMutation = {
    readonly response: SocialSignInButtonFacebookSignInMutationResponse;
    readonly variables: SocialSignInButtonFacebookSignInMutationVariables;
};



/*
mutation SocialSignInButtonFacebookSignInMutation(
  $accessToken: String!
) {
  signInWithFacebook(accessToken: $accessToken) {
    token
    user {
      id
      email
      name
      photoURL
      verified
      profile {
        authType
      }
    }
  }
}
*/

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
    "name": "SocialSignInButtonFacebookSignInMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SocialSignInButtonFacebookSignInMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "168ad1c505c0cbe50ea3c2dc9cb2294e",
    "id": null,
    "metadata": {},
    "name": "SocialSignInButtonFacebookSignInMutation",
    "operationKind": "mutation",
    "text": "mutation SocialSignInButtonFacebookSignInMutation(\n  $accessToken: String!\n) {\n  signInWithFacebook(accessToken: $accessToken) {\n    token\n    user {\n      id\n      email\n      name\n      photoURL\n      verified\n      profile {\n        authType\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7963716f8f2c9a21116c08e8a6975d3f';
export default node;
