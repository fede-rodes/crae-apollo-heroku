const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const { mergeTypes } = require('merge-graphql-schemas');
const merge = require('lodash/merge');
const Author = require('./author');
const Post = require('./post');

const APIs = {
  Author,
  Post,
};

// Filter out those APIs for which 'typeDefs' and 'resolvers' are defined. In
// the end we'll get something like the following:
// const allTypeDefs = [Base.typeDefs, User.typeDefs, ...];
// const allResolvers = [Base.resolvers, User.resolvers, ...];
const allTypeDefs = [];
const allResolvers = [];

const keys = Object.keys(APIs);
const { length } = keys;

for (let i = 0; i < length; i += 1) {
  const key = keys[i];
  const { typeDefs, resolvers } = APIs[key];

  if (typeDefs && resolvers) {
    allTypeDefs.push(typeDefs);
    allResolvers.push(resolvers);
  }
}

// Merge all types and resolvers from APIs to create our executable schema
const typeDefs = mergeTypes(allTypeDefs);
const resolvers = merge(...allResolvers);
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
