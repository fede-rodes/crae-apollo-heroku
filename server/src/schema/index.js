// Import schema definition
import SchemaDefinition from './schema-definition.graphql';

// Import query
import Query from './query.graphql';

// Import types
import Author from './author.graphql';
import Post from './post.graphql';

const schema = [
  SchemaDefinition,
  Query,
  Author,
  Post,
];

export default schema;
