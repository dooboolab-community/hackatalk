import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: String
    email: String
    password: String
    name: String
  }

  input UserCreateInput {
    email: String
    password: String
    name: String
  }

  type Mutation {
    signUp(user: UserCreateInput): User!
  }

  type Query {
    users(email: String, name: String): [User!]!
  }
`;

export default typeDefs;
