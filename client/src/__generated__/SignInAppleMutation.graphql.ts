/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SignInAppleMutationVariables = {
    accessToken: string;
};
export type SignInAppleMutationResponse = {
    readonly signInWithApple: {
        readonly token: string;
        readonly user: {
            readonly id: string;
        };
    };
};
export type SignInAppleMutation = {
    readonly response: SignInAppleMutationResponse;
    readonly variables: SignInAppleMutationVariables;
};



/*
mutation SignInAppleMutation(
  $accessToken: String!
) {
  signInWithApple(accessToken: $accessToken) {
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
            "name": "signInWithApple",
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
            "name": "SignInAppleMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "SignInAppleMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "d501704c6043d66e2bf069e7c479cd73",
            "id": null,
            "metadata": {},
            "name": "SignInAppleMutation",
            "operationKind": "mutation",
            "text": "mutation SignInAppleMutation(\n  $accessToken: String!\n) {\n  signInWithApple(accessToken: $accessToken) {\n    token\n    user {\n      id\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'f585a2c83860c99764be69970f41eadd';
export default node;
