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

  async signUp(user: NexusGenInputs['UserCreateInput']): Promise<NexusGenRootTypes['User']> {
    return this.post('user', user);
  }

  async signInEmail(args: NexusGenArgTypes['Mutation']['signInEmail']): Promise<NexusGenRootTypes['AuthPayload']> {
    return this.post('user', args);
  }
}
