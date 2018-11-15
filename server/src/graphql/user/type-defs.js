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
    login(email: String!, passCode: Int!): AuthToken!
    sendPassCode(email: String!): Response!
  }
`;

module.exports = typeDefs;
