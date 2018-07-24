const typeDefs = `
  type Author {
    id: ID!
    firstName: String
    lastName: String
    posts: [Post]
  }

  type Query {
    authors: [Author]!
    author(id: ID, firstName: String, lastName: String): Author
  }
`;

module.exports = typeDefs;
