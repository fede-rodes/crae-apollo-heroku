const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const { typeDefs, resolvers } = require('./merge-schemas');

// Create our executable schema from merged schemas
const logger = { log: e => console.error(e.stack) };
const schema = makeExecutableSchema({ typeDefs, resolvers, logger });

// When in test mode, mock apollo resolvers
if (process.env.NODE_ENV === 'test') {
  // Here you could customize the mocks.
  // If you leave it empty, the default is used.
  // You can read more about mocking here: http://bit.ly/2pOYqXF
  // See:
  // https://www.apollographql.com/docs/graphql-tools/mocking.html#Default-mock-example
  // https://dev-blog.apollodata.com/mocking-your-server-with-just-one-line-of-code-692feda6e9cd
  const mocks = {
    Date: () => (new Date()),
  };

  // This function call adds the mocks to your schema!
  addMockFunctionsToSchema({ schema, mocks, preserveResolvers: true });
}

module.exports = schema;
