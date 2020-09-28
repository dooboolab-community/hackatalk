import { NexusGenArgTypes, NexusGenInputs, NexusGenRootTypes } from '../../../src/generated/nexus';

import { RESTDataSource } from 'apollo-datasource-rest';

export default class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5200/';
  }

  async me(): Promise<NexusGenRootTypes['User']> {
    return this.get('user');
  }

  async user(id:NexusGenArgTypes['Query']['user']): Promise<NexusGenRootTypes['User']> {
    return this.get('user', id);
  }

  async users(args:NexusGenArgTypes['Query']['users']): Promise<NexusGenRootTypes['UserEdge'][]> {
    return this.get('users', args);
  }

  async signUp(user: NexusGenInputs['UserCreateInput']): Promise<NexusGenRootTypes['User']> {
    return this.post('user', user);
  }

  async signInEmail(args: NexusGenArgTypes['Mutation']['signInEmail']): Promise<NexusGenRootTypes['AuthPayload']> {
    return this.post('user', args);
  }
}
