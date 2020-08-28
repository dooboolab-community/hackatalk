import userAPI from './userAPI';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface UserCreateInput {
  email: string;
  name: string;
  password: string;
}

export interface SignUpInput {
  signUpInput: UserCreateInput;
}

export interface SignUpResponse{
  user: Promise<User>;
}

export interface DataSources {
  userAPI: userAPI;
}

export interface Context {
  dataSources: DataSources;
}
