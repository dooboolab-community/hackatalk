/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
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
            readonly nickname: string | null;
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
      nickname
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
                            "name": "nickname",
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
            "name": "SocialSignInButtonFacebookSignInMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "SocialSignInButtonFacebookSignInMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "943a15b42d8df25d0ba5dbc632c9626b",
            "id": null,
            "metadata": {},
            "name": "SocialSignInButtonFacebookSignInMutation",
            "operationKind": "mutation",
            "text": "mutation SocialSignInButtonFacebookSignInMutation(\n  $accessToken: String!\n) {\n  signInWithFacebook(accessToken: $accessToken) {\n    token\n    user {\n      id\n      email\n      name\n      nickname\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '14cfa79e3da167b39bc38ee3879495b8';
export default node;
