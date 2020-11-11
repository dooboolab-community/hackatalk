/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SocialSignInButtonGoogleSignInMutationVariables = {
    accessToken: string;
};
export type SocialSignInButtonGoogleSignInMutationResponse = {
    readonly signInWithGoogle: {
        readonly token: string;
        readonly user: {
            readonly id: string;
        };
    };
};
export type SocialSignInButtonGoogleSignInMutation = {
    readonly response: SocialSignInButtonGoogleSignInMutationResponse;
    readonly variables: SocialSignInButtonGoogleSignInMutationVariables;
};



/*
mutation SocialSignInButtonGoogleSignInMutation(
  $accessToken: String!
) {
  signInWithGoogle(accessToken: $accessToken) {
    token
    user {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "accessToken"
        } as any)
    ], v1 = [
        ({
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
                        }
                    ],
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "SocialSignInButtonGoogleSignInMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "SocialSignInButtonGoogleSignInMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "df2ba06ae3ff50fb1830ffdd8839922c",
            "id": null,
            "metadata": {},
            "name": "SocialSignInButtonGoogleSignInMutation",
            "operationKind": "mutation",
            "text": "mutation SocialSignInButtonGoogleSignInMutation(\n  $accessToken: String!\n) {\n  signInWithGoogle(accessToken: $accessToken) {\n    token\n    user {\n      id\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '8720da50c20025e15e124a2c1dbedd25';
export default node;
