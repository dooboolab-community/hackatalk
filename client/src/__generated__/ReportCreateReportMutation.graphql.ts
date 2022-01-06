/**
 * @generated SignedSource<<b54b2db8603f72507110e88cf368f7f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ReportCreateReportMutation$variables = {
  reportedUserId: string;
  report: string;
};
export type ReportCreateReportMutationVariables = ReportCreateReportMutation$variables;
export type ReportCreateReportMutation$data = {
  readonly createReport: {
    readonly report: string;
  } | null;
};
export type ReportCreateReportMutationResponse = ReportCreateReportMutation$data;
export type ReportCreateReportMutation = {
  variables: ReportCreateReportMutationVariables;
  response: ReportCreateReportMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "report"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "reportedUserId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "report",
    "variableName": "report"
  },
  {
    "kind": "Variable",
    "name": "reportedUserId",
    "variableName": "reportedUserId"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "report",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ReportCreateReportMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Report",
        "kind": "LinkedField",
        "name": "createReport",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
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
    "name": "ReportCreateReportMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Report",
        "kind": "LinkedField",
        "name": "createReport",
        "plural": false,
        "selections": [
          (v3/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "98ce154bd8dd3b281f5fc7e8229b8090",
    "id": null,
    "metadata": {},
    "name": "ReportCreateReportMutation",
    "operationKind": "mutation",
    "text": "mutation ReportCreateReportMutation(\n  $reportedUserId: String!\n  $report: String!\n) {\n  createReport(reportedUserId: $reportedUserId, report: $report) {\n    report\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c1bb38b47fafa46542aea81f33f73782";

export default node;
