import 'react-native-get-random-values';

import {
  ConnectionHandler,
  RecordProxy,
  RecordSourceSelectorProxy,
} from 'relay-runtime';

import {nanoid} from 'nanoid';

/**
 * Prepend a message record to a message connection of a channel.
 * @param store Relay store proxy.
 * @param channelId ID of the channel to be updated.
 * @param messageProxy Record proxy of the messaged to be prepended.
 */
function prependMessageToChannel(
  store: RecordSourceSelectorProxy,
  channelId: string,
  messageProxy: RecordProxy,
): void {
  const root = store.getRoot();

  const messagesConnection = ConnectionHandler.getConnection(
    root,
    'MessageComponent_messages',
    {
      channelId,
      searchText: null,
    },
  );

  if (!messagesConnection) return;

  const newMessageEdge = ConnectionHandler.createEdge(
    store,
    messagesConnection,
    messageProxy,
    'Message',
  );

  // Insert new edge if the message is not already in connection.

  const existingEdges = messagesConnection?.getLinkedRecords('edges') ?? [];

  if (
    !existingEdges.find(
      (edge) =>
        edge.getLinkedRecord('node')?.getDataID() === messageProxy.getDataID(),
    )
  )
    ConnectionHandler.insertEdgeBefore(messagesConnection, newMessageEdge);
}

/**
 * Put the updated channel at the beginning of channels connection.
 * @param store Relay store proxy.
 * @param channelId ID of the channel that is updated.
 */
function updateChannelAndRearrange(
  store: RecordSourceSelectorProxy,
  channelId: string,
): void {
  const root = store.getRoot();

  const channelProxy =
    store.get(channelId) || store.create(channelId, 'Channel');

  const channelsConnection = ConnectionHandler.getConnection(
    root,
    'MainChannelComponent_channels',
    {
      withMessage: true,
    },
  );

  if (!channelsConnection) return;

  // Remove existing edge.
  const existingEdges = channelsConnection?.getLinkedRecords('edges') ?? [];

  for (const edge of existingEdges) {
    const node = edge.getLinkedRecord('node');

    if (node?.getDataID() === channelId) {
      ConnectionHandler.deleteNode(channelsConnection, node.getDataID());
      break;
    }
  }

  // Prepend new edge.
  const newChannelEdge = ConnectionHandler.createEdge(
    store,
    channelsConnection,
    channelProxy,
    'Channel',
  );

  ConnectionHandler.insertEdgeBefore(channelsConnection, newChannelEdge);
}

/**
 * Update Relay store after `createMessage` mutation.
 * @param store Relay store proxy for updater.
 * @param channelId ID of the channel to be updated.
 */
export function createMessageUpdater(
  store: RecordSourceSelectorProxy<{
    createMessage: {readonly id: string} | null;
  }>,
  channelId: string,
): void {
  const messageProxy = store.getRootField('createMessage');

  prependMessageToChannel(store, channelId, messageProxy);
  updateChannelAndRearrange(store, channelId);
}

/**
 * Optimistically update Relay store after `createMessage` mutation.
 * @param store Relay store proxy for updater.
 * @param channelId ID of the channel to be updated.
 * @param text Text content of the message.
 * @param userId ID of the auth user.
 */
export function createMessageOptimisticUpdater(
  store: RecordSourceSelectorProxy,
  channelId: string,
  text: string,
  userId: string,
): void {
  const messageProxy = store.create(nanoid(), 'Message');

  messageProxy.setValue(text, 'text');
  messageProxy.setLinkedRecord(store.get(userId) ?? null, 'sender');

  prependMessageToChannel(store, channelId, messageProxy);
  updateChannelAndRearrange(store, channelId);
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
  const payload = store.getRootField('onMessage');
  const channelId = payload.getLinkedRecord('channel')?.getValue('id');

  if (!channelId) return;

  prependMessageToChannel(store, channelId, payload);
  updateChannelAndRearrange(store, channelId);
}
