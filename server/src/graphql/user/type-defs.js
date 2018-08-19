const typeDefs = `
  type User {
    _id: ID!
    createdAt: Date!
    email: String!
  }

  type Query {
    user: User
  }

  type Mutation {
    sendPassCode(email: String!): Response!
  }
`;

module.exports = typeDefs;
