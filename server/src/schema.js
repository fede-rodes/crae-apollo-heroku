import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type Author {
    id: ID! # "!" denotes a required field
    firstName: String
    lastName: String
    posts: [Post] # we'll need to define a resolver func for this field since it's not default type
  }

  type Post {
    id: ID!
    title: String
    text: String
    author: Author # we'll need to define a resolver func for this field since it's not default type
  }

  # This type specifies the entry points into our API.
  type Query {
    authors: [Author]
    author(id: ID, firstName: String, lastName: String): Author
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
