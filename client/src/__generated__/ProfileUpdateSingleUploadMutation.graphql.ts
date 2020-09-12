/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ProfileUpdateSingleUploadMutationVariables = {
    file?: unknown | null;
    dir?: string | null;
};
export type ProfileUpdateSingleUploadMutationResponse = {
    readonly singleUpload: string | null;
};
export type ProfileUpdateSingleUploadMutation = {
    readonly response: ProfileUpdateSingleUploadMutationResponse;
    readonly variables: ProfileUpdateSingleUploadMutationVariables;
};



/*
mutation ProfileUpdateSingleUploadMutation(
  $file: Upload
  $dir: String
) {
  singleUpload(file: $file, dir: $dir)
}
*/

const node: ConcreteRequest = (function () {
    var v0 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "dir"
    } as any), v1 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "file"
    } as any), v2 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "dir",
                    "variableName": "dir"
                },
                {
                    "kind": "Variable",
                    "name": "file",
                    "variableName": "file"
                }
            ],
            "kind": "ScalarField",
            "name": "singleUpload",
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
            "name": "ProfileUpdateSingleUploadMutation",
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
            "name": "ProfileUpdateSingleUploadMutation",
            "selections": (v2 /*: any*/)
        },
        "params": {
            "cacheID": "a150c127c2fe8e0e7c7da7f88d8f2360",
            "id": null,
            "metadata": {},
            "name": "ProfileUpdateSingleUploadMutation",
            "operationKind": "mutation",
            "text": "mutation ProfileUpdateSingleUploadMutation(\n  $file: Upload\n  $dir: String\n) {\n  singleUpload(file: $file, dir: $dir)\n}\n"
        }
    } as any;
})();
(node as any).hash = '731d69927e9b22c9551faa0e3fbd90dd';
export default node;
