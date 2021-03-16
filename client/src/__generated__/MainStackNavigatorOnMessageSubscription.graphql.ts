/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MainStackNavigatorOnMessageSubscriptionVariables = {};
export type MainStackNavigatorOnMessageSubscriptionResponse = {
    readonly onMessage: {
        readonly id: string;
        readonly imageUrls: ReadonlyArray<string | null> | null;
        readonly sender: {
            readonly id: string;
            readonly name: string | null;
            readonly nickname: string | null;
        } | null;
        readonly createdAt: unknown | null;
        readonly " $fragmentRefs": FragmentRefs<"MessageListItem_message">;
    } | null;
};
export type MainStackNavigatorOnMessageSubscription = {
    readonly response: MainStackNavigatorOnMessageSubscriptionResponse;
    readonly variables: MainStackNavigatorOnMessageSubscriptionVariables;
};



/*
subscription MainStackNavigatorOnMessageSubscription {
  onMessage {
    id
    imageUrls
    sender {
      id
      name
      nickname
    }
    createdAt
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
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageUrls",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nickname",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MainStackNavigatorOnMessageSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Message",
        "kind": "LinkedField",
        "name": "onMessage",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "sender",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MessageListItem_message"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MainStackNavigatorOnMessageSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Message",
        "kind": "LinkedField",
        "name": "onMessage",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "sender",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
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
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/),
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
            "name": "fileUrls",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "updatedAt",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bc4b707e8f7afbd8b581be2e2a585ca6",
    "id": null,
    "metadata": {},
    "name": "MainStackNavigatorOnMessageSubscription",
    "operationKind": "subscription",
    "text": "subscription MainStackNavigatorOnMessageSubscription {\n  onMessage {\n    id\n    imageUrls\n    sender {\n      id\n      name\n      nickname\n    }\n    createdAt\n    ...MessageListItem_message\n  }\n}\n\nfragment MessageListItem_message on Message {\n  id\n  messageType\n  text\n  imageUrls\n  fileUrls\n  createdAt\n  updatedAt\n  sender {\n    id\n    name\n    nickname\n    thumbURL\n    ...ProfileModal_user\n  }\n}\n\nfragment ProfileModal_user on User {\n  id\n  photoURL\n  name\n  nickname\n  hasBlocked\n  statusMessage\n}\n"
  }
};
})();
(node as any).hash = 'bbb3e5fd1be436d7d6d72177c08da0aa';
export default node;
