/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ChangePwChangeEmailPasswordMutationVariables = {
    password: string;
    newPassword: string;
};
export type ChangePwChangeEmailPasswordMutationResponse = {
    readonly changeEmailPassword: boolean;
};
export type ChangePwChangeEmailPasswordMutation = {
    readonly response: ChangePwChangeEmailPasswordMutationResponse;
    readonly variables: ChangePwChangeEmailPasswordMutationVariables;
};



/*
mutation ChangePwChangeEmailPasswordMutation(
  $password: String!
  $newPassword: String!
) {
  changeEmailPassword(password: $password, newPassword: $newPassword)
}
*/

const node: ConcreteRequest = (function () {
    var v0 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "newPassword"
    } as any), v1 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "password"
    } as any), v2 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "newPassword",
                    "variableName": "newPassword"
                },
                {
                    "kind": "Variable",
                    "name": "password",
                    "variableName": "password"
                }
            ],
            "kind": "ScalarField",
            "name": "changeEmailPassword",
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": [
                (v0 /*: any*/),
                (v1 /*: any*/)
            ],
            "kind": "Fragment",
            "metadata": null,
            "name": "ChangePwChangeEmailPasswordMutation",
            "selections": (v2 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [
                (v1 /*: any*/),
                (v0 /*: any*/)
            ],
            "kind": "Operation",
            "name": "ChangePwChangeEmailPasswordMutation",
            "selections": (v2 /*: any*/)
        },
        "params": {
            "cacheID": "b4032e96839ed3dada69236fd5544841",
            "id": null,
            "metadata": {},
            "name": "ChangePwChangeEmailPasswordMutation",
            "operationKind": "mutation",
            "text": "mutation ChangePwChangeEmailPasswordMutation(\n  $password: String!\n  $newPassword: String!\n) {\n  changeEmailPassword(password: $password, newPassword: $newPassword)\n}\n"
        }
    } as any;
})();
(node as any).hash = 'b2c399e3706cf44019c20b5acbd5fabb';
export default node;
