/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MessageListItemTestQueryVariables = {};
export type MessageListItemTestQueryResponse = {
    readonly myData: {
        readonly " $fragmentRefs": FragmentRefs<"MessageListItem_message">;
    } | null;
};
export type MessageListItemTestQuery = {
    readonly response: MessageListItemTestQueryResponse;
    readonly variables: MessageListItemTestQueryVariables;
};



/*
query MessageListItemTestQuery {
  myData: message(id: "test-id") {
    ...MessageListItem_message
  }
}

fragment MessageListItem_message on Message {
  id
  messageType
  text
  imageUrls
  fileUrls
  createdAt
  updatedAt
  sender {
    id
    name
    nickname
    thumbURL
    ...ProfileModal_user
  }
}

fragment ProfileModal_user on User {
  id
  photoURL
  name
  nickname
  hasBlocked
  statusMessage
  isFriend
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MessageListItemTestQuery",
    "selections": [
      {
        "alias": "myData",
        "args": (v0/*: any*/),
        "concreteType": "Message",
        "kind": "LinkedField",
        "name": "message",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MessageListItem_message"
          }
        ],
        "storageKey": "message(id:\"test-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MessageListItemTestQuery",
    "selections": [
      {
        "alias": "myData",
        "args": (v0/*: any*/),
        "concreteType": "Message",
        "kind": "LinkedField",
        "name": "message",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "messageType",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "text",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "imageUrls",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "fileUrls",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "updatedAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "sender",
            "plural": false,
            "selections": [
              (v1/*: any*/),
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "thumbURL",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "photoURL",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasBlocked",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "statusMessage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isFriend",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "message(id:\"test-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "15cbd80b34796cddc574810b807baea1",
    "id": null,
    "metadata": {},
    "name": "MessageListItemTestQuery",
    "operationKind": "query",
    "text": "query MessageListItemTestQuery {\n  myData: message(id: \"test-id\") {\n    ...MessageListItem_message\n  }\n}\n\nfragment MessageListItem_message on Message {\n  id\n  messageType\n  text\n  imageUrls\n  fileUrls\n  createdAt\n  updatedAt\n  sender {\n    id\n    name\n    nickname\n    thumbURL\n    ...ProfileModal_user\n  }\n}\n\nfragment ProfileModal_user on User {\n  id\n  photoURL\n  name\n  nickname\n  hasBlocked\n  statusMessage\n  isFriend\n}\n"
  }
};
})();
(node as any).hash = 'cdd7c1bce4b2c386f243844d12a023e0';
export default node;
