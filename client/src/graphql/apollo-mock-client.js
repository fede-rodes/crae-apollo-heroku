/**
 * @see {@link https://www.robinwieruch.de/graphql-server-mock-apollo-client/}
 * @see {@link https://www.apollographql.com/docs/graphql-tools/mocking.html}
 */
// import { ApolloClient } from 'apollo-client';
// import { SchemaLink } from 'apollo-link-schema';
// import { printSchema } from 'graphql/utilities/schemaPrinter';
// import {
//   makeExecutableSchema,
//   introspectSchema,
//   addMockFunctionsToSchema,
// } from 'graphql-tools';
// import { httpLink, cache } from './apollo-client';


// const resolvers = {
//   Mutation: () => ({
//     login: () => ({ _id: '123', token: 'xyz123' }),
//   }),
// };

// async function createMockClient() {
//   // Query schema from server
//   const schemaJSON = await introspectSchema(httpLink);

//   // Stringify schema.json coming from the server
//   const typeDefs = printSchema(schemaJSON);

//   const executableSchema = makeExecutableSchema({
//     typeDefs,
//     resolvers,
//     resolverValidationOptions: {
//       requireResolversForResolveType: false,
//     },
//   });

//   const mockClient = new ApolloClient({
//     link: new SchemaLink({ schema: executableSchema }),
//     cache,
//   });

//   // // Make a GraphQL schema with no resolvers
//   // const schema = makeExecutableSchema({ typeDefs });

//   // // Add mocks, modifies schema in place
//   // addMockFunctionsToSchema({
//   //   schema,
//   //   mocks,
//   //   preserveResolvers: false,
//   // });

//   // const mockClient = new ApolloClient({
//   //   link: new SchemaLink({ schema }),
//   //   cache,
//   // });

//   return mockClient;
// }

// export default createMockClient();

/**
 * @see {@link https://www.robinwieruch.de/graphql-server-mock-apollo-client/}
 * @see {@link https://www.apollographql.com/docs/graphql-tools/mocking.html}
 */
import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
// import { printSchema } from 'graphql/utilities/schemaPrinter';
import { buildClientSchema } from 'graphql/utilities/buildClientSchema';
import { makeExecutableSchema, introspectSchema, addResolveFunctionsToSchema } from 'graphql-tools';
import { httpLink, cache } from './apollo-client';
// import schema from './schema.json';

const resolvers = {
  Mutation: {
    login: () => ({ _id: '123', token: 'xyz123' }),
  },
};

// async function createMockClient() {
  // Query schema from server
  // const schemaJSON = await introspectSchema(httpLink);

  // Stringify schema.json coming from the server
  // const typeDefs = printSchema(schemaJSON);
  // const executableSchema = buildClientSchema(schema);
  const schema = buildClientSchema(require('./schema.json'));


  addResolveFunctionsToSchema({ schema, resolvers });

  // Make a GraphQL schema with mocked resolvers
  /* const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  }); */

  const mockClient = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache,
  });

  // return mockClient;
// }

export default mockClient;

// export default createMockClient;

/*
import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import { makeExecutableSchema, introspectSchema } from 'graphql-tools';
import { link, cache } from './apollo-client';

/**
 * @see {@link https://www.robinwieruch.de/graphql-server-mock-apollo-client/}
 //
async function createMockClient() {
  const schema = await introspectSchema(link); // query schema from server

  const executableSchema = makeExecutableSchema({
    typeDefs: printSchema(schema), // stringify schema.json coming from the server
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  });

  const mockClient = new ApolloClient({
    link: new SchemaLink({ schema: executableSchema }),
    cache,
  });

  return mockClient;
}

export default createMockClient;
*/





/*
/**
 * @see {@link https://www.robinwieruch.de/graphql-server-mock-apollo-client/}
 * @see {@link https://www.apollographql.com/docs/graphql-tools/mocking.html}
 */
// import { ApolloClient } from 'apollo-client';
// import { SchemaLink } from 'apollo-link-schema';
// import { printSchema } from 'graphql/utilities/schemaPrinter';
// import {
//   makeExecutableSchema,
//   introspectSchema,
//   addMockFunctionsToSchema,
// } from 'graphql-tools';
// import { httpLink, cache } from './apollo-client';


// const resolvers = {
//   Mutation: () => ({
//     login: () => ({ _id: '123', token: 'xyz123' }),
//   }),
// };

// async function createMockClient() {
//   // Query schema from server
//   const schemaJSON = await introspectSchema(httpLink);

//   // Stringify schema.json coming from the server
//   const typeDefs = printSchema(schemaJSON);

//   const executableSchema = makeExecutableSchema({
//     typeDefs,
//     resolvers,
//     resolverValidationOptions: {
//       requireResolversForResolveType: false,
//     },
//   });

//   const mockClient = new ApolloClient({
//     link: new SchemaLink({ schema: executableSchema }),
//     cache,
//   });

//   // // Make a GraphQL schema with no resolvers
//   // const schema = makeExecutableSchema({ typeDefs });

//   // // Add mocks, modifies schema in place
//   // addMockFunctionsToSchema({
//   //   schema,
//   //   mocks,
//   //   preserveResolvers: false,
//   // });

//   // const mockClient = new ApolloClient({
//   //   link: new SchemaLink({ schema }),
//   //   cache,
//   // });

//   return mockClient;
// }

// export default createMockClient();

/**
 * @see {@link https://www.robinwieruch.de/graphql-server-mock-apollo-client/}
 * @see {@link https://www.apollographql.com/docs/graphql-tools/mocking.html}
 //
import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import {
  makeExecutableSchema,
  introspectSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import { httpLink, cache } from './apollo-client';

const mocks = {
  Mutation: {
    login: () => ({ _id: '123', token: 'xyz123' }),
  },
};

const resolvers = {
  Mutation: {
    login: () => ({ _id: '123', token: 'xyz123' }),
  },
};

async function createMockClient() {
  // Query schema from server
  const schemaJSON = await introspectSchema(httpLink);

  // Stringify schema.json coming from the server
  const typeDefs = printSchema(schemaJSON);

  // Make a GraphQL schema with no resolvers
  const schema = makeExecutableSchema({ typeDefs });

  // Add mocks, modifies schema in place
  addMockFunctionsToSchema({
    schema,
    mocks,
    preserveResolvers: false,
  });

  const mockClient = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache,
  });

  // const executableSchema = makeExecutableSchema({
  //   typeDefs,
  //   resolvers,
  //   resolverValidationOptions: {
  //     requireResolversForResolveType: false,
  //   },
  // });

  // const mockClient = new ApolloClient({
  //   link: new SchemaLink({ schema: executableSchema }),
  //   cache,
  // });

  return mockClient;
}

export default createMockClient;


import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import { makeExecutableSchema, introspectSchema } from 'graphql-tools';
import { link, cache } from './apollo-client';

/**
 * @see {@link https://www.robinwieruch.de/graphql-server-mock-apollo-client/}
 //
async function createMockClient() {
  const schema = await introspectSchema(link); // query schema from server

  const executableSchema = makeExecutableSchema({
    typeDefs: printSchema(schema), // stringify schema.json coming from the server
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  });

  const mockClient = new ApolloClient({
    link: new SchemaLink({ schema: executableSchema }),
    cache,
  });

  return mockClient;
}

export default createMockClient;

*/