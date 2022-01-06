/**
 * @generated SignedSource<<7485b38b072c3b9b9484b9fa6a20a1cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UploadSingleUploadMutation$variables = {
  file: any;
  dir: string;
};
export type UploadSingleUploadMutationVariables = UploadSingleUploadMutation$variables;
export type UploadSingleUploadMutation$data = {
  readonly singleUpload: string;
};
export type UploadSingleUploadMutationResponse = UploadSingleUploadMutation$data;
export type UploadSingleUploadMutation = {
  variables: UploadSingleUploadMutationVariables;
  response: UploadSingleUploadMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "dir"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "file"
},
v2 = [
  {
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UploadSingleUploadMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "UploadSingleUploadMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "f6726252665c86c713fd52fdd932b156",
    "id": null,
    "metadata": {},
    "name": "UploadSingleUploadMutation",
    "operationKind": "mutation",
    "text": "mutation UploadSingleUploadMutation(\n  $file: Upload!\n  $dir: String!\n) {\n  singleUpload(file: $file, dir: $dir)\n}\n"
  }
};
})();

(node as any).hash = "7fe23bbe646db6d5a4b98daaeb77693a";

export default node;
