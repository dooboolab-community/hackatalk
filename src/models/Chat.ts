import { User } from './User';

export class Chat {
  public constructor(
    public id: string = '', 
    public sender: User = undefined, 
    public message: string = '', 
    public created: Date = undefined, 
    public updated: Date = undefined
  ) {}
}
