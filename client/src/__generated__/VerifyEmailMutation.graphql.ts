/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type VerifyEmailMutationVariables = {
    email: string;
};
export type VerifyEmailMutationResponse = {
    readonly sendVerification: boolean;
};
export type VerifyEmailMutation = {
    readonly response: VerifyEmailMutationResponse;
    readonly variables: VerifyEmailMutationVariables;
};



/*
mutation VerifyEmailMutation(
  $email: String!
) {
  sendVerification(email: $email)
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "email",
            "type": "String!"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "email",
                    "variableName": "email"
                }
            ],
            "kind": "ScalarField",
            "name": "sendVerification",
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "VerifyEmailMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "VerifyEmailMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "VerifyEmailMutation",
            "operationKind": "mutation",
            "text": "mutation VerifyEmailMutation(\n  $email: String!\n) {\n  sendVerification(email: $email)\n}\n"
        }
    } as any;
})();
(node as any).hash = '3ca6abd765eef3d36ac25d7d63355707';
export default node;
