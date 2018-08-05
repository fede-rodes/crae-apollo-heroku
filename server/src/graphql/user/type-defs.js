const typeDefs = `
  type User {
    _id: ID!
    createdAt: Date!
  }

  type Query {
    user: User!
  }
`;

module.exports = typeDefs;
