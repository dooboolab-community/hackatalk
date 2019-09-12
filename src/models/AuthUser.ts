import { User } from './User';

export class AuthUser extends User {
  constructor(private pushToken: string = '') {
    super();
  }
}
