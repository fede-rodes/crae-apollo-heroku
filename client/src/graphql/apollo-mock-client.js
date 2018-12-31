/**
 * @see {@link https://www.robinwieruch.de/graphql-server-mock-apollo-client/}
 * @see {@link https://www.apollographql.com/docs/graphql-tools/mocking.html}
 */
import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import {
  makeExecutableSchema,
  introspectSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import { httpLink, cache } from './apollo-client';

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
    // mocks,
    // preserveResolvers: false,
  });

  const mockClient = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache,
  });

  return mockClient;
}

export default createMockClient;


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