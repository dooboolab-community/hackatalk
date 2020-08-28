import { User, UserCreateInput } from './types';

import { RESTDataSource } from 'apollo-datasource-rest';

export default class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5200/';
  }

  async users(): Promise<User[]> {
    return this.get('users');
  }

  async signUp(user: UserCreateInput): Promise<User> {
    return this.post('user', user);
  }
}
