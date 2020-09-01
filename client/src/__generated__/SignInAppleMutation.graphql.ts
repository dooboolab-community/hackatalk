/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SignInAppleMutationVariables = {
    idToken: string;
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
  $idToken: String!
) {
  signInWithApple(accessToken: $idToken) {
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
            "name": "idToken"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "accessToken",
                    "variableName": "idToken"
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
            "cacheID": "35c138f5251cbee5640bf254e09d3be9",
            "id": null,
            "metadata": {},
            "name": "SignInAppleMutation",
            "operationKind": "mutation",
            "text": "mutation SignInAppleMutation(\n  $idToken: String!\n) {\n  signInWithApple(accessToken: $idToken) {\n    token\n    user {\n      id\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'e99bef1cc310ea16a7901ce9d8cc07ef';
export default node;
