import { ImageURISource } from 'react-native';
import { Chatroom } from './Chatroom';

export class User {
  public constructor(
    public uid: string = '',
    public displayName: string = '',
    public photoURL: string = '',
    public statusMsg: string = '',
    public isOnline: boolean = false,
    public friends: User[] = [],
    public chatrooms: Chatroom[] = [],
    public created: Date = undefined,
    public updated: Date = undefined,
  ) {}
}
