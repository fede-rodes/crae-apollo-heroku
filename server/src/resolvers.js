import _ from 'lodash';
import { Author, Post } from './connectors';

const resolvers = {
  Query: {
    authors: () => (Author.findAll({})),
    author: (root, args) => {
      const query = {};
      _.each(['firstName', 'lastName'], (fieldName) => {
        if (args[fieldName] && args[fieldName].trim().length > 0) {
          _.extend(query, { [fieldName]: args[fieldName].trim() });
        }
      });

      if (_.isEmpty(query)) {
        return null;
      }

      return Author.find({ where: query });
    },
  },
  // We need to tell graphql how to resolve the 'posts' field inside the Author
  // query. We could also define resolver functions for the rest of the Author
  // fields, but if we don't do that graphql will default to the field values,
  // which is exactly what we want.
  Author: {
    posts(author) {
      return author.getPosts();
    },
  },
  Post: {
    author(post) {
      return post.getAuthor();
    },
  },
};

export default resolvers;
