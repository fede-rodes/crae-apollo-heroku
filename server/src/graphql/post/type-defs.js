const typeDefs = `
  type Post {
    _id: ID!
    title: String
    text: String
    author: Author
  }
`;

module.exports = typeDefs;
