const typeDefs = `
  type Author {
    _id: ID!
    firstName: String
    lastName: String
    posts: [Post]
  }

  type Query {
    authors: [Author]!
    author(firstName: String, lastName: String): Author
  }
`;

module.exports = typeDefs;
