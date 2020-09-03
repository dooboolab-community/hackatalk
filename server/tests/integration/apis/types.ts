import UserAPI from './UserAPI';

export interface DataSources {
  userAPI: UserAPI
}

export interface Context {
  dataSources: DataSources
}
