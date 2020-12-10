/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type FindPwMutationVariables = {
    email: string;
};
export type FindPwMutationResponse = {
    readonly findPassword: boolean | null;
};
export type FindPwMutation = {
    readonly response: FindPwMutationResponse;
    readonly variables: FindPwMutationVariables;
};



/*
mutation FindPwMutation(
  $email: String!
) {
  findPassword(email: $email)
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "email"
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
            "name": "findPassword",
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "FindPwMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "FindPwMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "169fe21367276f971e23a5bbee6cb143",
            "id": null,
            "metadata": {},
            "name": "FindPwMutation",
            "operationKind": "mutation",
            "text": "mutation FindPwMutation(\n  $email: String!\n) {\n  findPassword(email: $email)\n}\n"
        }
    } as any;
})();
(node as any).hash = 'c87e505f487fc1ee8a394955b07d93e4';
export default node;
