import { Chat } from './Chat';
import { User } from './User';

export class Chatroom {
  public constructor(
    public id: string = '',
    public lastChat: Chat = undefined,
    public lastChatCnt: number = 0,
    public chats: Chat[] = [],
    public users: User[] = [],
    public created: Date = undefined,
    public updated: Date = undefined,
  ) {}
}
