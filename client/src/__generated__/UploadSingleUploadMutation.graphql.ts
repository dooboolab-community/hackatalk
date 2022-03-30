/**
 * @generated SignedSource<<ff8cfbb2b3cb74273870ba6ce1245ab1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UploadSingleUploadMutation$variables = {
  file: any;
  dir?: string | null;
};
export type UploadSingleUploadMutation$data = {
  readonly singleUpload: string;
};
export type UploadSingleUploadMutation = {
  variables: UploadSingleUploadMutation$variables;
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
    "cacheID": "e825a4c3ff6932ef99e70a6a8c7eb178",
    "id": null,
    "metadata": {},
    "name": "UploadSingleUploadMutation",
    "operationKind": "mutation",
    "text": "mutation UploadSingleUploadMutation(\n  $file: Upload!\n  $dir: String\n) {\n  singleUpload(file: $file, dir: $dir)\n}\n"
  }
};
})();

(node as any).hash = "c0bf0e7a939336270a11e1445098ffeb";

export default node;
