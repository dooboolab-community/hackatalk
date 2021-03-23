import {ConnectionHandler, RecordSourceSelectorProxy} from 'relay-runtime';

import moment from 'moment';

/**
 * Update Relay store after `createMessage` mutation.
 * @param store Relay store proxy for updater.
 * @param channelId ID of the channel to be updated.
 * @param userId ID of the auth user.
 */
export function createMessageUpdater(
  store: RecordSourceSelectorProxy,
  channelId: string,
  userId: string,
): void {
  // Update message connection.
  const root = store.getRoot();

  const messagesConnection =
    root &&
    ConnectionHandler.getConnection(root, 'MessageComponent_messages', {
      channelId,
      searchText: null,
    });

  const payload = store.getRootField('createMessage');
  const user = store.get(userId);
  const now = moment().toString();

  if (user && payload) {
    payload.setLinkedRecord(user, 'sender');
    payload.setValue(now, 'createdAt');
    payload.setValue(now, 'updatedAt');
  }

  const newMessageEdge =
    messagesConnection &&
    payload &&
    ConnectionHandler.createEdge(store, messagesConnection, payload, 'Message');

  if (messagesConnection && newMessageEdge)
    ConnectionHandler.insertEdgeBefore(messagesConnection, newMessageEdge);

  // Update channels.
  const channel = store.get(channelId);

  const channelsConnection =
    root &&
    ConnectionHandler.getConnection(root, 'ChannelComponent_channels', {
      withMessage: true,
    });

  // Get existing edges.
  const existingChannels = channelsConnection?.getLinkedRecords('edges') ?? [];

  // Check if the message is created inside a new channel.
  let existingNode;

  for (const edge of existingChannels) {
    const node = edge.getLinkedRecord('node');

    if (node?.getDataID() === channelId) {
      existingNode = node;
      break;
    }
  }

  const newChannelEdge =
    channelsConnection &&
    channel &&
    ConnectionHandler.createEdge(store, channelsConnection, channel, 'Channel');

  if (existingNode && channelsConnection)
    ConnectionHandler.deleteNode(channelsConnection, existingNode.getDataID());

  if (channelsConnection && newChannelEdge)
    ConnectionHandler.insertEdgeBefore(channelsConnection, newChannelEdge);
}

/**
 * Update Relay store after `createMessage` mutation.
 * @param store Relay store proxy for updater.
 * @param channelId ID of the channel to be updated.
 * @param userId ID of the auth user.
 */
export function onMessageUpdater(
  store: RecordSourceSelectorProxy<{
    onMessage:
      | {
          channel:
            | {
                id: string | null | undefined;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
  }>,
): void {
  const root = store.getRoot();
  const payload = store.getRootField('onMessage');

  const channelId = payload.getLinkedRecord('channel')?.getValue('id');

  const messagesConnection =
    root &&
    ConnectionHandler.getConnection(root, 'MessageComponent_messages', {
      channelId,
      searchText: null,
    });

  const newMessageEdge =
    messagesConnection &&
    ConnectionHandler.createEdge(store, messagesConnection, payload, 'Message');

  if (messagesConnection && newMessageEdge)
    ConnectionHandler.insertEdgeBefore(messagesConnection, newMessageEdge);
}
