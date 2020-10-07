import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
  first?: boolean
  last?: boolean
  before?: boolean
  after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  User: Prisma.User
  Notification: Prisma.Notification
  Profile: Prisma.Profile
  Friend: Prisma.Friend
  Membership: Prisma.Membership
  Channel: Prisma.Channel
  Message: Prisma.Message
  Reply: Prisma.Reply
  Reaction: Prisma.Reaction
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'email' | 'password' | 'name' | 'nickname' | 'thumbURL' | 'photoURL' | 'birthday' | 'gender' | 'phone' | 'statusMessage' | 'verified' | 'lastSignedIn' | 'isOnline' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'profile' | 'notifications' | 'friends' | 'memberships' | 'Notification' | 'Friend' | 'Membership' | 'Message' | 'Reply' | 'Reaction'
      ordering: 'id' | 'email' | 'password' | 'name' | 'nickname' | 'thumbURL' | 'photoURL' | 'birthday' | 'gender' | 'phone' | 'statusMessage' | 'verified' | 'lastSignedIn' | 'isOnline' | 'createdAt' | 'updatedAt' | 'deletedAt'
    }
    notifications: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'token' | 'device' | 'os' | 'userId' | 'user' | 'createdAt' | 'User'
      ordering: 'id' | 'token' | 'device' | 'os' | 'userId' | 'createdAt'
    }
    profiles: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'socialId' | 'authType' | 'userId' | 'User'
      ordering: 'id' | 'socialId' | 'authType' | 'userId'
    }
    friends: {
      filtering: 'AND' | 'OR' | 'NOT' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'userId' | 'user' | 'friendId' | 'friend'
      ordering: 'createdAt' | 'updatedAt' | 'deletedAt' | 'userId' | 'friendId'
    }
    memberships: {
      filtering: 'AND' | 'OR' | 'NOT' | 'alertMode' | 'membershipType' | 'isVisible' | 'createdAt' | 'updatedAt' | 'userId' | 'user' | 'channelId' | 'channel' | 'User'
      ordering: 'alertMode' | 'membershipType' | 'isVisible' | 'createdAt' | 'updatedAt' | 'userId' | 'channelId'
    }
    channels: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'channelType' | 'name' | 'messages' | 'membership' | 'lastMessageId' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'Message'
      ordering: 'id' | 'channelType' | 'name' | 'lastMessageId' | 'createdAt' | 'updatedAt' | 'deletedAt'
    }
    messages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'messageType' | 'text' | 'imageUrls' | 'fileUrls' | 'reactions' | 'replies' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'channelId' | 'channel' | 'senderId' | 'sender' | 'Channel' | 'Reply'
      ordering: 'id' | 'messageType' | 'text' | 'imageUrls' | 'fileUrls' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'channelId' | 'senderId'
    }
    replies: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'messageType' | 'text' | 'imageUrls' | 'fileUrls' | 'reactions' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'senderId' | 'sender' | 'messageId' | 'message' | 'Message'
      ordering: 'id' | 'messageType' | 'text' | 'imageUrls' | 'fileUrls' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'senderId' | 'messageId'
    }
    reactions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'value' | 'userId' | 'user' | 'messageId' | 'message' | 'replyId' | 'reply'
      ordering: 'id' | 'value' | 'userId' | 'messageId' | 'replyId'
    }
  },
  User: {
    notifications: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'token' | 'device' | 'os' | 'userId' | 'user' | 'createdAt' | 'User'
      ordering: 'id' | 'token' | 'device' | 'os' | 'userId' | 'createdAt'
    }
    friends: {
      filtering: 'AND' | 'OR' | 'NOT' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'userId' | 'user' | 'friendId' | 'friend'
      ordering: 'createdAt' | 'updatedAt' | 'deletedAt' | 'userId' | 'friendId'
    }
    memberships: {
      filtering: 'AND' | 'OR' | 'NOT' | 'alertMode' | 'membershipType' | 'isVisible' | 'createdAt' | 'updatedAt' | 'userId' | 'user' | 'channelId' | 'channel' | 'User'
      ordering: 'alertMode' | 'membershipType' | 'isVisible' | 'createdAt' | 'updatedAt' | 'userId' | 'channelId'
    }
    Notification: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'token' | 'device' | 'os' | 'userId' | 'user' | 'createdAt' | 'User'
      ordering: 'id' | 'token' | 'device' | 'os' | 'userId' | 'createdAt'
    }
    Friend: {
      filtering: 'AND' | 'OR' | 'NOT' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'userId' | 'user' | 'friendId' | 'friend'
      ordering: 'createdAt' | 'updatedAt' | 'deletedAt' | 'userId' | 'friendId'
    }
    Membership: {
      filtering: 'AND' | 'OR' | 'NOT' | 'alertMode' | 'membershipType' | 'isVisible' | 'createdAt' | 'updatedAt' | 'userId' | 'user' | 'channelId' | 'channel' | 'User'
      ordering: 'alertMode' | 'membershipType' | 'isVisible' | 'createdAt' | 'updatedAt' | 'userId' | 'channelId'
    }
    Message: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'messageType' | 'text' | 'imageUrls' | 'fileUrls' | 'reactions' | 'replies' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'channelId' | 'channel' | 'senderId' | 'sender' | 'Channel' | 'Reply'
      ordering: 'id' | 'messageType' | 'text' | 'imageUrls' | 'fileUrls' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'channelId' | 'senderId'
    }
    Reply: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'messageType' | 'text' | 'imageUrls' | 'fileUrls' | 'reactions' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'senderId' | 'sender' | 'messageId' | 'message' | 'Message'
      ordering: 'id' | 'messageType' | 'text' | 'imageUrls' | 'fileUrls' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'senderId' | 'messageId'
    }
    Reaction: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'value' | 'userId' | 'user' | 'messageId' | 'message' | 'replyId' | 'reply'
      ordering: 'id' | 'value' | 'userId' | 'messageId' | 'replyId'
    }
  }
  Notification: {

  }
  Profile: {

  }
  Friend: {

  }
  Membership: {

  }
  Channel: {
    messages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'messageType' | 'text' | 'imageUrls' | 'fileUrls' | 'reactions' | 'replies' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'channelId' | 'channel' | 'senderId' | 'sender' | 'Channel' | 'Reply'
      ordering: 'id' | 'messageType' | 'text' | 'imageUrls' | 'fileUrls' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'channelId' | 'senderId'
    }
    membership: {
      filtering: 'AND' | 'OR' | 'NOT' | 'alertMode' | 'membershipType' | 'isVisible' | 'createdAt' | 'updatedAt' | 'userId' | 'user' | 'channelId' | 'channel' | 'User'
      ordering: 'alertMode' | 'membershipType' | 'isVisible' | 'createdAt' | 'updatedAt' | 'userId' | 'channelId'
    }
    Message: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'messageType' | 'text' | 'imageUrls' | 'fileUrls' | 'reactions' | 'replies' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'channelId' | 'channel' | 'senderId' | 'sender' | 'Channel' | 'Reply'
      ordering: 'id' | 'messageType' | 'text' | 'imageUrls' | 'fileUrls' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'channelId' | 'senderId'
    }
  }
  Message: {
    reactions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'value' | 'userId' | 'user' | 'messageId' | 'message' | 'replyId' | 'reply'
      ordering: 'id' | 'value' | 'userId' | 'messageId' | 'replyId'
    }
    replies: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'messageType' | 'text' | 'imageUrls' | 'fileUrls' | 'reactions' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'senderId' | 'sender' | 'messageId' | 'message' | 'Message'
      ordering: 'id' | 'messageType' | 'text' | 'imageUrls' | 'fileUrls' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'senderId' | 'messageId'
    }
    Reply: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'messageType' | 'text' | 'imageUrls' | 'fileUrls' | 'reactions' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'senderId' | 'sender' | 'messageId' | 'message' | 'Message'
      ordering: 'id' | 'messageType' | 'text' | 'imageUrls' | 'fileUrls' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'senderId' | 'messageId'
    }
  }
  Reply: {
    reactions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'value' | 'userId' | 'user' | 'messageId' | 'message' | 'replyId' | 'reply'
      ordering: 'id' | 'value' | 'userId' | 'messageId' | 'replyId'
    }
  }
  Reaction: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    user: 'User'
    users: 'User'
    notification: 'Notification'
    notifications: 'Notification'
    profile: 'Profile'
    profiles: 'Profile'
    friend: 'Friend'
    friends: 'Friend'
    membership: 'Membership'
    memberships: 'Membership'
    channel: 'Channel'
    channels: 'Channel'
    message: 'Message'
    messages: 'Message'
    reply: 'Reply'
    replies: 'Reply'
    reaction: 'Reaction'
    reactions: 'Reaction'
  },
  Mutation: {
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
    createOneNotification: 'Notification'
    updateOneNotification: 'Notification'
    updateManyNotification: 'BatchPayload'
    deleteOneNotification: 'Notification'
    deleteManyNotification: 'BatchPayload'
    upsertOneNotification: 'Notification'
    createOneProfile: 'Profile'
    updateOneProfile: 'Profile'
    updateManyProfile: 'BatchPayload'
    deleteOneProfile: 'Profile'
    deleteManyProfile: 'BatchPayload'
    upsertOneProfile: 'Profile'
    createOneFriend: 'Friend'
    updateOneFriend: 'Friend'
    updateManyFriend: 'BatchPayload'
    deleteOneFriend: 'Friend'
    deleteManyFriend: 'BatchPayload'
    upsertOneFriend: 'Friend'
    createOneMembership: 'Membership'
    updateOneMembership: 'Membership'
    updateManyMembership: 'BatchPayload'
    deleteOneMembership: 'Membership'
    deleteManyMembership: 'BatchPayload'
    upsertOneMembership: 'Membership'
    createOneChannel: 'Channel'
    updateOneChannel: 'Channel'
    updateManyChannel: 'BatchPayload'
    deleteOneChannel: 'Channel'
    deleteManyChannel: 'BatchPayload'
    upsertOneChannel: 'Channel'
    createOneMessage: 'Message'
    updateOneMessage: 'Message'
    updateManyMessage: 'BatchPayload'
    deleteOneMessage: 'Message'
    deleteManyMessage: 'BatchPayload'
    upsertOneMessage: 'Message'
    createOneReply: 'Reply'
    updateOneReply: 'Reply'
    updateManyReply: 'BatchPayload'
    deleteOneReply: 'Reply'
    deleteManyReply: 'BatchPayload'
    upsertOneReply: 'Reply'
    createOneReaction: 'Reaction'
    updateOneReaction: 'Reaction'
    updateManyReaction: 'BatchPayload'
    deleteOneReaction: 'Reaction'
    deleteManyReaction: 'BatchPayload'
    upsertOneReaction: 'Reaction'
  },
  User: {
    id: 'String'
    email: 'String'
    password: 'String'
    name: 'String'
    nickname: 'String'
    thumbURL: 'String'
    photoURL: 'String'
    birthday: 'DateTime'
    gender: 'Gender'
    phone: 'String'
    statusMessage: 'String'
    verified: 'Boolean'
    lastSignedIn: 'DateTime'
    isOnline: 'Boolean'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    profile: 'Profile'
    notifications: 'Notification'
    friends: 'Friend'
    memberships: 'Membership'
    Notification: 'Notification'
    Friend: 'Friend'
    Membership: 'Membership'
    Message: 'Message'
    Reply: 'Reply'
    Reaction: 'Reaction'
  }
  Notification: {
    id: 'Int'
    token: 'String'
    device: 'String'
    os: 'String'
    userId: 'String'
    user: 'User'
    createdAt: 'DateTime'
    User: 'User'
  }
  Profile: {
    id: 'Int'
    socialId: 'String'
    authType: 'AuthType'
    userId: 'String'
    User: 'User'
  }
  Friend: {
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    userId: 'String'
    user: 'User'
    friendId: 'String'
    friend: 'User'
  }
  Membership: {
    alertMode: 'AlertMode'
    membershipType: 'MembershipType'
    isVisible: 'Boolean'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    userId: 'String'
    user: 'User'
    channelId: 'String'
    channel: 'Channel'
    User: 'User'
  }
  Channel: {
    id: 'String'
    channelType: 'ChannelType'
    name: 'String'
    messages: 'Message'
    membership: 'Membership'
    lastMessageId: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    Message: 'Message'
  }
  Message: {
    id: 'String'
    messageType: 'MessageType'
    text: 'String'
    imageUrls: 'String'
    fileUrls: 'String'
    reactions: 'Reaction'
    replies: 'Reply'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    channelId: 'String'
    channel: 'Channel'
    senderId: 'String'
    sender: 'User'
    Channel: 'Channel'
    Reply: 'Reply'
  }
  Reply: {
    id: 'Int'
    messageType: 'MessageType'
    text: 'String'
    imageUrls: 'String'
    fileUrls: 'String'
    reactions: 'Reaction'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    senderId: 'String'
    sender: 'User'
    messageId: 'String'
    message: 'Message'
    Message: 'Message'
  }
  Reaction: {
    id: 'Int'
    value: 'String'
    userId: 'String'
    user: 'User'
    messageId: 'String'
    message: 'Message'
    replyId: 'Int'
    reply: 'Reply'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  User: Typegen.NexusPrismaFields<'User'>
  Notification: Typegen.NexusPrismaFields<'Notification'>
  Profile: Typegen.NexusPrismaFields<'Profile'>
  Friend: Typegen.NexusPrismaFields<'Friend'>
  Membership: Typegen.NexusPrismaFields<'Membership'>
  Channel: Typegen.NexusPrismaFields<'Channel'>
  Message: Typegen.NexusPrismaFields<'Message'>
  Reply: Typegen.NexusPrismaFields<'Reply'>
  Reaction: Typegen.NexusPrismaFields<'Reaction'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  