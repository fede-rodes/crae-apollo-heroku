const typeDefs = `
  type User {
    _id: ID!
    createdAt: Date!
    email: String!
  }

  type AuthToken {
    _id: ID!
    token: String!
  }

  type Query {
    user: User
  }

  type Mutation {
    signup(email: String!): User!
    login(email: String!, passCode: Int!): AuthToken!
    sendPassCode(email: String!): User!
  }
`;

module.exports = typeDefs;
